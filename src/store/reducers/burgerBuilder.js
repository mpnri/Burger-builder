import * as actionTypes from '../actions/actionTypes';
import INGREDIENT_PRICES from '../../constants/IngredientPrices'

const initialState = {
    /*ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },*/
    ingredients: null,
    totalPrice: 4,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: parseFloat((state.totalPrice + INGREDIENT_PRICES[action.ingredientName]).toFixed(2))
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: parseFloat((state.totalPrice - INGREDIENT_PRICES[action.ingredientName]).toFixed(2))
            }
        case actionTypes.SET_INGREDIENTS:
            console.log(action.ingredients);
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: initialState.totalPrice,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}

export default reducer;