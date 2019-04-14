import React from 'react';

import classes from './BurgerIngredient.module.css';

const burgerIngredient = (props) => {
	let ingredient = undefined;

	switch (props.type) {
		case 'bread-bottom':
			ingredient = <div className={classes.BreadBottom} />;
			break;

		case 'bread-top':
			ingredient = (
				<div className={classes.BreadTop}>
					<div className={classes.Seeds1} />
					<div className={classes.Seeds2} />
				</div>
			);
			break;

		case 'meat':
			ingredient = <div className={classes.Meat} />;
			break;

		case 'cheese':
			ingredient = <div className={classes.Cheese} />;
			break;

		case 'salad':
			ingredient = <div className={classes.Salad} />;
			break;

		case 'bacon':
			ingredient = <div className={classes.Bacon} />;
			break;

		default:
			ingredient = undefined;
			break;
	}

	return ingredient;
};

export default burgerIngredient;
