import * as actionTypes from './actionTypes';
import axios from '../../axios-orders.js';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/data/ingredients')
            .then(response => {
                //console.log(response);
                console.log(response.data[0].data);
                //this.setState({ingredients: response.data[0].data});                            
                dispatch({
                    type: actionTypes.SET_INGREDIENTS,
                    ingredients: response.data[0].data
                });
            })
            .catch(error => {
                console.log('my error: ',error);
                //this.setState({error: true});
                dispatch(fetchIngredientsFailed());
            })
    }
}