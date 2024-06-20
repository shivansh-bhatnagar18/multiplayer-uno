import React from 'react';
import Message from './Message';
import { Message as MessageType } from '../../../../backend/src/types';
interface MessageListProps {
    messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className="flex-l p-2">
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
        </div>
    );
};

export default MessageList;
