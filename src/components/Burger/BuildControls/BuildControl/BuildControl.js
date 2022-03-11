import styles from './BuildControl.module.css'

const BuildControl = props => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less} onClick={props.removeIngredient} disabled={props.disabled}>Less</button>
        <button className={styles.More} onClick={props.addIngredient}>more</button>   
    </div>
);

export default BuildControl;