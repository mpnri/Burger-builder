import * as actionTypes from './actionTypes';
import axios from '../../axios-orders.js';

const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

const purchaseBurgerFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/data/orders", orderData)
            .then((res) => {
                //console.log(response);
                //setTimeout(() => {
                console.log("====================================");
                console.log(res);
                console.log("====================================");
                // this.setState({
                //     loading: false
                // });
                // console.log(this.props);
                // this.props.history.push("/");
                //}, 1000);
                //this.setState({loading: false, purchasing: false});
                console.log(res.data);
                dispatch(purchaseBurgerSuccess(res.data.created, orderData));
            })
            .catch((error) => {
                console.log(error);
                //setTimeout(() => {
                // this.setState({
                //     loading: false
                // });
                dispatch(purchaseBurgerFail(error));
                //}, 1000);
            });
    };
};


const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};


export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/data/orders')
            .then(res => {
                //this.setState({loading: false, orders: [...res.data]});
                dispatch(fetchOrdersSuccess(res.data));
                console.log(res.data);
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
                //this.setState({loading: false});
            })
    }
}