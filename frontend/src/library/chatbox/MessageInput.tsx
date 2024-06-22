import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import Button from '../button';
import { ChatEventTypes } from '../../../../backend/src/types';
import { triggerEvent } from '../../channel';
import { useAuth } from '../../contexts/AuthContext';

const MessageInput: React.FC = () => {
    const [content, setContent] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const auth = useAuth();

    const handleSend = async () => {
        if (content.trim() !== '') {
            triggerEvent({
                type: ChatEventTypes.SEND_MESSAGE,
                data: {
                    id: Date.now().toString(),
                    content: content.trim(),
                    playerName: auth.getUser()?.name || 'Unknown user',
                },
            });
            setContent('');
        }
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setContent(content + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="relative flex p-1 border-t border-gray-300">
            <button
                className="mr-1 p-2 bg-white text-gray-800 rounded-xl border-2 border-gray-500"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
                😊
            </button>
            {showEmojiPicker && (
                <div className="absolute bottom-14 left-0 z-50">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
            )}
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-0.5 px-1 py-1 border-2 border-gray-500 rounded-xl font-kavoon text-sm"
                placeholder="Type a message..."
            />
            <Button
                variant="accept"
                size="medium"
                backgroundColor="bg-gray-400"
                buttonSize="w-34 h-11"
                className="ml-2 border-2"
                onClick={handleSend}
            >
                Send
            </Button>
        </div>
    );
};

// Simulate an API call to send the message

export default MessageInput;
