import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
  return (
    <>
      <h3>Your Order</h3>
      <p>A delecious burger with the following ingredients:</p>
      <ul>
        {Object.keys(props.ingredients).map((ingredient) => {
          return (
            <li key={ingredient}>
              <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
              {props.ingredients[ingredient]}
            </li>
          );
        })}
      </ul>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </>
  );
};

export default OrderSummary;
