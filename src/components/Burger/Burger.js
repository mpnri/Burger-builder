import React from 'react';
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
        return Array(props.ingredients[ingredient]).fill(null).map((_,ind) => (
            <BurgerIngredient key={ingredient+ind} type={ingredient} />
        ))
    }).reduce( (arr, current) => arr.concat(current), []); /// or [...arr, ...current]
    
    //console.log(transformedIngredients);
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients.length ? transformedIngredients
                    :
                <p>Please start adding ingredients!</p>}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;