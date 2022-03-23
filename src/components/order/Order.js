import styles from './Order.module.css'

const Order = (props) => (
    <div className={styles.Order}>
        <p>Ingredients: {
            Object.keys(props.ingredients).map(ingredient => (
                <span 
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px',
                    }}
                    key={ingredient}>{ingredient} ({props.ingredients[ingredient]})</span>
            ))
        }</p>
        <p>Price: <strong>{props.price}</strong></p>
    </div>
);

export default Order;