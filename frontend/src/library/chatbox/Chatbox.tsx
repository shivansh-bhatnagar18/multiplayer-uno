import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { ChatMessage as MessageType } from '../../../../backend/src/types';
import { FaComments } from 'react-icons/fa';

const Chatbox: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isVisible, setIsVisible] = useState(false);

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
                        <MessageList messages={messages} />
                    </div>
                    <div className="border-t border-gray-300">
                        <MessageInput setMessages={setMessages} />
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
