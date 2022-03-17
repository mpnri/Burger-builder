import React, {Component} from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import INGREDIENT_PRICES from '../../constants/IngredientPrices'
import axios from '../../axios-orders.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice : 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                //setTimeout(()=>{
                    this.setState({ingredients: response.data});
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
        this.updatePurchaseState();
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type]){
            const newIngredients = {...this.state.ingredients};
            newIngredients[type]--;
            const newTotalProce = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ingredients: {...newIngredients}, totalPrice: newTotalProce});
            this.updatePurchaseState();
        }
    }

    updatePurchaseState () {
        this.setState(state=>{
            const ingredients = {
                ...state.ingredients
            };
            const sum = Object.keys(ingredients).map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
            return { purchasable: sum > 0 };
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
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
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                //setTimeout(() => {
                    this.setState({loading: false, purchasing: false});
                //}, 1000);
                //this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                //setTimeout(() => {
                    this.setState({loading: false, purchasing: false});
                //}, 1000);
            });
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key]<=0;
        console.log(disabledInfo);
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/> ,
        orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        removeIngredient={this.removeIngredientHandler}
                        addIngredient={this.addIngredientHandler}/>
                </>
            );
            orderSummary = (
                <OrderSummary
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}/>
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

export default withErrorHandler(BurgerBuilder, axios);