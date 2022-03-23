import React, { Component } from 'react';
import Order from '../../components/order/Order';
import axios from '../../axios-orders.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/data/orders')
            .then(res => {
                this.setState({loading: false, orders: [...res.data]});
                console.log(res.data);
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.objectId}
                        ingredients={order.Order.ingredients}
                        price={order.Order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);