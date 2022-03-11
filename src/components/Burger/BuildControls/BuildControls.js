import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label : 'Salad', type: 'salad'},
    { label : 'Bacon', type: 'bacon'},
    { label : 'Cheese', type: 'cheese'},
    { label : 'Meat', type: 'meat'},
];

const BuildControls = props => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(control => (
                <BuildControl
                    disabled={props.disabled[control.type]}
                    addIngredient={()=>props.addIngredient(control.type)}
                    removeIngredient={()=>props.removeIngredient(control.type)}
                    key={control.label}
                    label={control.label}/>
            ))
        }
        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default BuildControls;