// Design a flexible reusable button component that can be used in different parts of the application.
// The button component should have the following features:
// - Customize background color, text color, and border color
// - Customize the size of the button (small, medium, large)
// - Customize the shape of the button (rectangle, rounded, circle)
// - Handles click events

import React from 'react';
import '../index.css';

type ButtonProps = {
    text: string;
    textColor?: string;
    backgroundColor?: string;
    fontSize?: string;
    rounded?: string;
    buttonSize?: string;
    borderColor?: string;
    hoverColor?: string;
    hoverScale?: boolean;
    px?: string;
    py?: string;
    className?: string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
    text,
    textColor = 'text-white',
    backgroundColor = 'bg-lime-500',
    fontSize = 'text-lg',
    rounded = 'rounded-2xl',
    buttonSize = 'w-36 h-11',
    px = 'px-3',
    py = 'py-1',
    borderColor = 'border-black',
    hoverColor = 'hover:bg-lime-600',
    hoverScale = true,
    onClick,
    className = '',
}) => {
    return (
        <button
            onClick={onClick}
            className={`text-stroke ${className} shadow-xl border-3 ${borderColor} font-kavoon ${textColor} ${buttonSize} ${rounded} ${fontSize} ${px} ${py} ${backgroundColor} transition-all duration-300 ${hoverScale ? 'transform hover:scale-105' : ''} ${hoverColor}`}
        >
            {text}
        </button>
    );
};

export default Button;
