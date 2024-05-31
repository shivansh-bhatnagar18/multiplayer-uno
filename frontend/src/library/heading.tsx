import styles from './heading.module.css';

type InputComponentProps = {
    title?: string;
};


function Heading({ title } : InputComponentProps) {
    return (
        <div>
            <h1 className={styles.heading}>{title}</h1>
        </div>
    );
}

export default Heading;