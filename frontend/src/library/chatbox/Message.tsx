import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { ChatMessage } from '../../../../backend/src/types';
import { FaRegSmile } from 'react-icons/fa';

interface MessageProps {
    message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        console.log(emojiData);
        setShowEmojiPicker(false);
    };

    return (
        <div className="relative bg-gray-200 text-gray-800 p-2.5 mb-6 max-w-xs rounded-xl">
            <div className="absolute -top-2 left-0 text-blue-900 font-kavoon text-xs px-2 py-0 rounded-t-2xl bg-gray-200">
                {message.playerName}
            </div>
            <div className="break-words font-kavoon">{message.content}</div>
            <div className="absolute bottom-0 left-3 transform translate-x-1/4 translate-y-1/2 w-4 h-4 bg-gray-200 rotate-45"></div>
            <div className="mt-1 flex space-x-1 items-center relative">
                {message.reactions?.map(([emoji], index) => (
                    <span key={index} className="text-sm">
                        {emoji}
                    </span>
                ))}
                <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <FaRegSmile className="w-4 h-4" />
                </button>
                {showEmojiPicker && (
                    <div className="bg-white border border-gray-300 -left-6 absolute z-50">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
