import styles from './BuildControl.module.css'

const BuildControl = props => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less}>Less</button>
        <button className={styles.More}>more</button>   
    </div>
);

export default BuildControl;