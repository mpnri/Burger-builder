import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.module.css';

import axios from '../../../axios-orders.js.js';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from  '../../../store/actions/';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: 'fastest',
        valid: true
      },
    },
    formIsValid: false,
    //loading: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules) { //! When element didn't need to be validate}
        if (rules.required) {
        isValid &&= value.trim() !== "";
        }

        if (rules.minLength) {
        isValid &&= value.length >= rules.minLength;
        }

        if (rules.maxLength) {
        isValid &&= value.length <= rules.maxLength;
        }
    }
    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    if (!this.state.formIsValid)return;

    /// TODO: this.setState({ loading: true });
    const customer = {};
    Object.keys(this.state.orderForm).forEach((data) => {
      customer[data] = this.state.orderForm[data].value;
    });
    const order = {
      //order: {
        ingredients: this.props.ings,
        price: this.props.price,
        customer: customer,
      //},
    };
    console.log(this.state.orderForm);
    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, identifier) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = { ...this.state.orderForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement?.validation
    );
    updatedFormElement.touched = true;
    updatedForm[identifier] = updatedFormElement;

    this.setState({ 
        orderForm: updatedForm,
        formIsValid: Object.keys(updatedForm).reduce( (isValid, key) => isValid && updatedForm[key].valid, true)
    });
  };

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {/* <Input elementType="..."  elementConfig="..." value="..." /> */}
            {Object.keys(this.state.orderForm).map((key) => (
              <Input
                key={key}
                elementType={this.state.orderForm[key].elementType}
                elementConfig={this.state.orderForm[key].elementConfig}
                value={this.state.orderForm[key].value}
                //label={key}
                changed={(event) => this.inputChangedHandler(event, key)}
                invalid={!this.state.orderForm[key].valid}
                touched={this.state.orderForm[key].touched}
              />
            ))}

            {/* <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" /> */}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading
  }
};


const mapDispatchToProps = {
  onOrderBurger: (orderData) => actions.purchaseBurger(orderData)
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));