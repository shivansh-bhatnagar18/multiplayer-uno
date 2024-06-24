import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { ChatEventTypes, ChatMessage } from '../../../../backend/src/types';
import { FaComments } from 'react-icons/fa';
import * as channel from '../../channel';
import { useToast } from '../toast/toast-context';

// todo: For better UX, we should temporarily display the message just sent and
// then update the list with the message received from the server.

const Chatbox: React.FC = () => {
    const [messages, setMessages] = useState<{ [k: string]: ChatMessage }>({});
    const [isVisible, setIsVisible] = useState(false);
    const [replyMessage, setReplyMessage] = useState<ChatMessage | null>(null);
    const toast = useToast();

    useEffect(() => {
        channel.setChatEventsDispatcher((event) => {
            console.log('Received chat event:', event);
            switch (event.type) {
                case ChatEventTypes.SEND_MESSAGE:
                    if (!isVisible) {
                        toast.open({
                            message:
                                event.data.playerName +
                                ': ' +
                                event.data.content,
                        });
                    }
                    event.data.reactions = []; // should be done server-side
                    setMessages((messages) => {
                        return {
                            ...messages,
                            [event.data.id]: event.data,
                        };
                    });
                    break;
                case ChatEventTypes.REACT_TO_MESSAGE:
                    setMessages((messages) => {
                        const message = messages[event.data.ref];
                        if (!message) {
                            console.log(
                                'Message not found for reaction:',
                                event.data.ref
                            );
                            return messages;
                        }
                        const updatedMessage = {
                            ...message,
                            reactions: [
                                ...(message.reactions || []),
                                [event.data.reaction, ''],
                            ],
                        } as ChatMessage;
                        return {
                            ...messages,
                            [event.data.ref]: updatedMessage,
                        };
                    });
                    break;
            }
        });
    }, [messages, isVisible, toast]);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            <div
                className={`w-80 h-96 bg-lime-400 rounded-lg overflow-hidden mb-2 transition-all duration-300 ${
                    isVisible
                        ? 'opacity-100 shadow-2xl'
                        : 'opacity-0 pointer-events-none shadow-none'
                }`}
                style={{
                    boxShadow: isVisible
                        ? '0px 20px 30px rgba(0, 0, 0, 0.2)'
                        : 'none',
                }}
            >
                <div className="flex flex-col h-full">
                    <div className="flex-grow overflow-y-auto">
                        <MessageList
                            messages={messages}
                            setReplyMessage={setReplyMessage}
                        />
                    </div>
                    <div className="border-t border-gray-300">
                        <MessageInput
                            replyMessage={replyMessage}
                            setReplyMessage={setReplyMessage}
                        />
                    </div>
                </div>
            </div>
            <button
                className="p-3 bg-lime-500 text-gray-700 rounded-full focus:outline-none transform transition-transform duration-300 hover:scale-105 hover:bg-lime-400 active:bg-lime-600 shadow-md"
                onClick={() => setIsVisible(!isVisible)}
            >
                <FaComments className="w-7 h-7" />
            </button>
        </div>
    );
};

export default Chatbox;
