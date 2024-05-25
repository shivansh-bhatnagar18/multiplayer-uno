import styles from './input.module.css';

type InputProps = {
    placeholder?: string;
};

function Input({ placeholder }: InputProps) {
    return (
        <div>
            <input className={styles.input} placeholder={placeholder}></input>
        </div>
    );
}

export default Input;
