// Design a flexible reusable button component that can be used in different parts of the application.
// The button component should have the following features:
// - Customize background color, text color, and border color
// - Customize the size of the button (small, medium, large)
// - Customize the shape of the button (rectangle, rounded, circle)
// - Handles click events

import React from 'react';
import '../index.css';

type ButtonProps = {
    textColor?: string;
    backgroundColor?: string;
    fontSize?: string;
    rounded?: string;
    buttonSize?: string;
    type?: 'submit' | 'reset' | 'button';
    borderColor?: string;
    hoverScale?: boolean;
    px?: string;
    py?: string;
    className?: string;
    onClick?: () => void;
    variant?: 'accept' | 'reject' | '';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    textColor,
    backgroundColor,
    fontSize,
    rounded,
    buttonSize,
    px,
    py,
    borderColor,
    hoverScale = true,
    type = 'button',
    onClick,
    className = '',
    variant = '',
    size = 'medium',
    children,
}) => {
    const variantStyles = {
        accept: {
            textColor: 'text-white',
            backgroundColor: 'bg-lime-500',
            borderColor: 'border-black',
            hoverColor: 'hover:brightness-125',
        },
        reject: {
            textColor: 'text-white',
            backgroundColor: 'bg-red-500',
            borderColor: 'border-black',
            hoverColor: 'hover:brightness-125',
        },
        default: {
            textColor: 'text-black',
            backgroundColor: 'bg-gray-200',
            borderColor: 'border-gray-400',
            hoverColor: 'hover:brightness-110',
        },
    };

    const sizeStyles = {
        small: {
            fontSize: 'text-md',
            rounded: 'rounded-xl',
            buttonSize: 'w-36 h-8',
            px: 'px-2',
            py: 'py-1',
        },
        medium: {
            fontSize: 'text-xl',
            rounded: 'rounded-2xl',
            buttonSize: 'w-44 h-12',
            px: 'px-1',
            py: 'py-1',
        },
        large: {
            fontSize: 'text-3xl',
            rounded: 'rounded-3xl',
            buttonSize: 'w-56 h-18',
            px: 'px-4',
            py: 'py-2',
        },
    };

    const chosenVariant = variant
        ? variantStyles[variant]
        : variantStyles.default;
    const chosenSize = sizeStyles[size];

    return (
        <button
            type={type}
            onClick={onClick}
            className={`text-stroke ${className} shadow-xl border-4 ${
                borderColor || chosenVariant.borderColor
            } font-kavoon ${textColor || chosenVariant.textColor} ${
                buttonSize || chosenSize.buttonSize
            } ${rounded || chosenSize.rounded} ${fontSize || chosenSize.fontSize} ${
                px || chosenSize.px
            } ${py || chosenSize.py} ${
                backgroundColor || chosenVariant.backgroundColor
            } transition-all duration-300 ${
                hoverScale ? 'transform hover:scale-105' : ''
            } ${chosenVariant.hoverColor}`}
        >
            {children}
        </button>
    );
};

export default Button;
