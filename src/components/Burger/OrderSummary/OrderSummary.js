import React, {Component} from 'react';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render() {
    return (
      <>
        <h3>Your Order</h3>
        <p>A delecious burger with the following ingredients:</p>
        <ul>
          {Object.keys(this.props.ingredients).map((ingredient) => {
            return (
              <li key={ingredient}>
                <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
                {this.props.ingredients[ingredient]}
              </li>
            );
          })}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </>
    );
  }
};

export default OrderSummary;
