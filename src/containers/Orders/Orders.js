import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';

import Order from '../../components/order/Order';
import axios from '../../axios-orders.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        this.props.onFetchOrders();
        // axios.get('/data/orders')
        //     .then(res => {
        //         this.setState({loading: false, orders: [...res.data]});
        //         console.log(res.data);
        //     })
        //     .catch(error => {
        //         this.setState({loading: false});
        //     })
    }

    render() {
        return (
            <div>
                {
                this.props.loading 
                    ? <Spinner/>
                    :
                    this.props.orders.map(order => (
                        <Order
                            key={order.objectId}
                            ingredients={order.ingredients}
                            price={order.price}/>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.order.loading,
    orders: state.order.orders
})

const mapDispatchToProps = {
    onFetchOrders: () => actions.fetchOrders()
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));