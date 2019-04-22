import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

export const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        // axios
        //     .get('/ingredients.json')
        //     .then(response => this.setState({ ingredients: response.data }))
        //     .catch(err => this.setState({ error: true }));
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchaseable: sum > 0,
        });
    }

    addIngredientHandler = type => {
        const oldCount = this.props.ings[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ings,
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.props.ings[type];
        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.props.ings,
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(
                `${encodeURIComponent(i)}=${encodeURIComponent(
                    this.props.ings[i],
                )}`,
            );
        }
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryParams.join('&')}&price=${this.state.totalPrice}`,
        });
    };

    render() {
        const disabledInfo = {
            ...this.props.ings,
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = undefined;

        let burger = this.state.error ? (
            <p>ingredients cannot be loaded</p>
        ) : (
            <Spinner />
        );
        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredientName =>
            dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName }),
        onIngredientRemoved: ingredientName =>
            dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
