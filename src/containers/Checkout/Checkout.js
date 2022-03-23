import React, {Component} from 'react';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    componentWillMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        query.forEach((_, key) => 
            (key === 'price')  ? price=query.get(key):ingredients[key]= +query.get(key) 
        ); //* or parseInt(query.get(key))
        console.log(ingredients);
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    
    checkoutContinued = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}  />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={()=> <ContactData {...this.props} ingredients={this.state.ingredients} price={this.state.totalPrice}/>}/>
            </div>
        );
    }
}

export default Checkout;