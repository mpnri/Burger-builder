import React, {Component} from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import INGREDIENT_PRICES from '../../constants/IngredientPrices'
import axios from '../../axios-orders.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    state = {
        totalPrice : 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('/data/ingredients')
            .then(response => {
                //setTimeout(()=>{
                    console.log(response);
                    this.setState({ingredients: JSON.parse(response.data[0].data)});
                //}, 1000);                
            })
            .catch(error => {
                console.log('sa',error);
                this.setState({error: true});
            })
    }

    addIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type]++;
        const newTotalProce = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: {...newIngredients}, totalPrice: newTotalProce});
        //this.updatePurchaseState();
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type]){
            const newIngredients = {...this.state.ingredients};
            newIngredients[type]--;
            const newTotalProce = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ingredients: {...newIngredients}, totalPrice: newTotalProce});
            //this.updatePurchaseState();
        }
    }

    updatePurchaseState () {
        const sum = Object.keys(this.props.ings).map(igKey => {
            return this.props.ings[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (const [key , val] of Object.entries(this.state.ingredients))
            queryParams.push(encodeURIComponent(key)+'='+encodeURIComponent(val));
        queryParams.push(encodeURIComponent('price')+'='+encodeURIComponent(this.state.totalPrice.toFixed(2)));
        
        console.log(queryParams);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            // search: '?' + queryString,
            // myProps: {
            //     salam: 'da',
            //     are: 'you Ok?'
            // }
        });
        
        
    }

    render(){
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key]<=0;
        console.log(disabledInfo);
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/> ,
        orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState()}
                        price={this.props.price}
                        disabled={disabledInfo}
                        removeIngredient={this.props.onIngredientRemoved}
                        addIngredient={this.props.onIngredientAdded}/>
                </>
            );
            orderSummary = (
                <OrderSummary
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.props.ings}/>
            );
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {this.state.loading ?
                        <Spinner/>
                        :
                        orderSummary
                    }
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    ings: state.ingredients,
    price: state.totalPrice
});

const mapDispatchToProps = {
    onIngredientAdded : (ingName) => ({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved : (ingName) => ({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));