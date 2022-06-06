import React, {Component} from 'react';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0,
    // }

    //? WARNING! To be deprecated in React v17. Use componentDidMount instead.
    // componentWillMount() {
    //     console.log(this.props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     query.forEach((_, key) => 
    //         (key === 'price')  ? price=query.get(key):ingredients[key]= +query.get(key) 
    //     ); //* or parseInt(query.get(key))
    //     console.log(ingredients);
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    
    checkoutContinued = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return (
            <div>
                {this.props.ings ? (    
                    <>
                        {this.props.purchased ? <Redirect to="/"/>:null}
                        <CheckoutSummary
                            ingredients={this.props.ings}
                            checkoutCancelled={this.checkoutCancelled}
                            checkoutContinued={this.checkoutContinued}  />
                        <Route
                            path={this.props.match.path + '/contact-data'}
                            //render={()=> <ContactData {...this.props} ingredients={this.props.ings} price={this.props.price}/>}
                            component={ContactData}
                        />
                    </>
                ): <Redirect to='/' />
            }
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
})

export default connect(mapStateToProps)(Checkout);