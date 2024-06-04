// Design a flexible reusable button component that can be used in different parts of the application.
// The button component should have the following features:
// - Customize background color, text color, and border color
// - Customize the size of the button (small, medium, large)
// - Customize the shape of the button (rectangle, rounded, circle)
// - Handles click events

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

function Button({ onClick, children }: ButtonProps) {
    return (
        <button
            className="text-white bg-red-600 px-5 py-2 rounded-3xl text-md shadow-md transform transition-transform hover:scale-105 hover:shadow-glow hover:bg-red-900 active:bg-black active:scale-95 active:shadow-none"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
