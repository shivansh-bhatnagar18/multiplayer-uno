import React from 'react';
import Message from './Message';
import { ChatMessage } from '../../../../backend/src/types';
interface MessageListProps {
    messages: { [k: string]: ChatMessage };
    setReplyMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
}

const MessageList: React.FC<MessageListProps> = ({
    messages,
    setReplyMessage,
}) => {
    return (
        <div className="flex-l p-2">
            {Object.values(messages).map((message, index) => (
                <Message
                    key={index}
                    id={message.id}
                    messages={messages}
                    replyCallback={(k) => setReplyMessage(k)}
                />
            ))}
        </div>
    );
};

export default MessageList;
