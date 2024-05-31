import styles from './input.module.css';

type InputComponentProps = {
    placeholder?: string;
};

function Input({ placeholder }: InputComponentProps) {
    return (
        <div>
            <input className={styles.input} placeholder={placeholder}></input>
        </div>
    );
}

export default Input;
