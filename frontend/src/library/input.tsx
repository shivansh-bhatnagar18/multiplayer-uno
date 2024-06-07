import React from 'react';

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    width?: string;
    height?: string;
};

const Input: React.FC<Props> = ({
    width = '392px',
    height = '44px',
    ...props
}) => {
    return (
        <input
            className={`w-[${width}] h-[${height}] bg-[#d9d9d9] border-4 border-black rounded-[20px] flex items-center justify-center text-center p-0 font-normal font-kavoon text-[23.2px] leading-[29px] text-black placeholder-white placeholder-opacity-50"`}
            {...props}
        />
    );
};

export default Input;
