// Design a flexible reusable button component that can be used in different parts of the application.
// The button component should have the following features:
// - Customize background color, text color, and border color
// - Customize the size of the button (small, medium, large)
// - Customize the shape of the button (rectangle, rounded, circle)
// - Handles click events

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
}

function Button({onClick, children}:ButtonProps) {
    return (
        <button onClick={onClick}>
            {
                children
            }
        </button>
    )
}

export default Button
