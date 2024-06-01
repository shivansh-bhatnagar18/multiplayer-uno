// Design a flexible reusable button component that can be used in different parts of the application.
// The button component should have the following features:
// - Customize background color, text color, and border color
// - Customize the size of the button (small, medium, large)
// - Customize the shape of the button (rectangle, rounded, circle)
// - Handles click events

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    size?:'small' |'medium' | 'large';
    textColor?: string;
    bgColor?: string;
    borderColor?: string;
    shape?:'rectangle' | 'rounded' | 'pills';

};



function Button({ children, onClick,size="medium",bgColor="bg-blue-500",textColor="text-white",borderColor=textColor,shape }: ButtonProps) {

const getSizeClass = () => {
    switch (size) {
        case 'small':
            return 'px-2 py-1 text-sm';
        case 'large':
            return 'px-4 py-2 text-lg';
        case 'medium':
            return 'px-3 py-2 text-base';
        default:
            return 'px-3 py-2 text-base';
    }
};

const getShapeClass = () => {
    switch (shape) {
        case 'rounded':
            return 'rounded-lg';
        case 'rectangle':
            return 'rounded-none';
        case 'pills':
            return 'rounded-full';
        default:
            return 'rounded-lg';
    }
};

const shapeClass = getShapeClass();
const sizeClass = getSizeClass();


    return <button onClick={onClick} className={`${bgColor} ${textColor} border ${borderColor} ${sizeClass} ${shapeClass} `}>{children}</button>;
}

export default Button;
