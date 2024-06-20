import React, { useState } from 'react';
import Button from './button';

type CopyButtonProps = {
    copyText: string;
    priorText?: string;
    postText?: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({
    priorText = '',
    copyText,
    postText = '',
}) => {
    const [copy, setCopy] = useState(false);
    const copyTextHandler = () => {
        navigator.clipboard.writeText(`${copyText}`);
        setCopy(true);
    };

    return (
        <Button
            type="button"
            onClick={copyTextHandler}
            buttonSize="small"
            fontSize="12px"
            className={` font-extralight  ${priorText === '' ? ' bg-none border-none bg-transparent' : ''} ${copy ? ' bg-green-400' : ''}`}
        >
            {!copy ? (
                <span>
                    {priorText != '' ? (
                        `${priorText}`
                    ) : (
                        <i className="fa-solid fa-clipboard"></i>
                    )}
                </span>
            ) : (
                <span>
                    {postText != '' ? `${postText}` : ''}
                    &nbsp;
                    <i className="fa-solid fa-check"></i>
                </span>
            )}
        </Button>
    );
};

export default CopyButton;
