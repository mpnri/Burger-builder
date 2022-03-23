import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders.js.js';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
            order: {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer: {
                    name: 'Amir Zouerami',
                    address: {
                        street: 'Teststreet 1',
                        zipCode: '9174582541',
                        country: 'Iran'
                    },
                    email: 'test@test.com'
                },
                deliveryMethod: 'fastest'
            }
        }
        axios.post('/data/orders', order)
            .then(response => {
                //console.log(response);
                //setTimeout(() => {
                    console.log('====================================');
                    console.log(response);
                    console.log('====================================');
                    this.setState({loading: false});
                    console.log(this.props);
                    this.props.history.push('/');
                //}, 1000);
                //this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                //setTimeout(() => {
                    this.setState({loading: false});
                //}, 1000);
            });
        
    }

    render() {
        return (
          <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {this.state.loading ?
            <Spinner/>:
            <form>
              <input type="text" name="name" placeholder="Your Name" />
              <input type="email" name="email" placeholder="Your Mail" />
              <input type="text" name="street" placeholder="Street" />
              <input type="text" name="postal" placeholder="Postal Code" />
              <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>}
          </div>
        );
    }
}

export default ContactData;