import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import Button from '../button';
import { ChatEventTypes, ChatMessage } from '../../../../backend/src/types';
import { triggerEvent } from '../../channel';
import { useAuth } from '../../contexts/AuthContext';

interface MessageInputProps {
    replyMessage: ChatMessage | null;
    setReplyMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
}

const MessageInput: React.FC<MessageInputProps> = ({
    replyMessage,
    setReplyMessage,
}) => {
    const [content, setContent] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const auth = useAuth();

    const handleSend = async () => {
        handleClose();
        console.log(replyMessage?.id);
        if (content.trim() !== '') {
            triggerEvent({
                type: ChatEventTypes.SEND_MESSAGE,
                data: {
                    id: Date.now().toString(),
                    content: content.trim(),
                    playerName: auth.getUser()?.name || 'Unknown user',
                    ref: replyMessage?.id,
                },
            });
            setContent('');
            setReplyMessage(null);
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
    const handleClose = () => {
        setReplyMessage(null);
    };

    return (
        <div className="relative p-1 border-t border-gray-300">
            {replyMessage && (
                <div className="flex items-center mb-2">
                    <div className="flex-1 p-2 bg-gray-200 rounded-t-lg border-b border-gray-500 ">
                        <p className="text-sm text-gray-900 font-kavoon">
                            Replying to: {replyMessage.playerName}
                        </p>

                        <p className="text-sm text-gray-600 font-kavoon">
                            {replyMessage && replyMessage.content.length > 35
                                ? replyMessage.content.slice(0, 35) + '...'
                                : replyMessage.content}
                        </p>
                        <button
                            className="absolute right-0 top-0 px-2 py-0 bg-none cursor-pointer border-transparent text-black"
                            onClick={handleClose}
                        >
                            {'x'}
                        </button>
                    </div>
                </div>
            )}
            <div className="flex items-center">
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
                    className="flex-1 px-1 py-1 border-2 border-gray-500 rounded-xl font-kavoon text-sm"
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
        </div>
    );
};

// Simulate an API call to send the message

export default MessageInput;
