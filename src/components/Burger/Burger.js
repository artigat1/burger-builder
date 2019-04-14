import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredent';

const burger = (props) => {
	// We get an object and not an array.
	// First create an empty array with the correct number of elements from the object
	// The key is the name of the ingredient and must match the type in the switch statement in BurgerIngredient
	let transformedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [ ...Array(props.ingredients[igKey]) ].map((_, idx) => {
				return <BurgerIngredient key={igKey + idx} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients.</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
