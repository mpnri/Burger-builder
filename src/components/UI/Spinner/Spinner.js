import styles from './Spinner.module.css';

const Spinner = props => (
    <div className={styles.spinner}>
        <div className={styles['double-bounce1']}></div>
        <div className={styles['double-bounce2']}></div>
    </div>
);

export default Spinner;