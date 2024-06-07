import React from 'react';

type InputProps = {
    text: string;
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string;
    textColor?: string;
    textAlign?: string;
    className?: string;
};

const Heading: React.FC<InputProps> = ({
    text,
    fontSize = 'text-sm', // default value
    fontWeight = 'font-normal', // default value
    fontStyle = 'font-sans', // default value
    textColor = 'text-black', // default value
    textAlign = 'text-center', // default value
    className = '', // additional custom classes
}) => {
    return (
        <div>
            <h1
                className={`${fontSize} ${fontWeight} ${fontStyle} ${textColor} ${textAlign} ${className}`}
            >
                {text}
            </h1>
        </div>
    );
};

export default Heading;
