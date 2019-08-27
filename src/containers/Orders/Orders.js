import React, { Component } from 'react';
import { connect } from "react-redux";

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as classes from './Orders.module.css';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner/>;
        if(this.props.orders.length === 0) {
            orders = (<h2 className={classes.NoOrders}>You have no orders</h2>);
        }
        if (!this.props.loading && this.props.orders.length > 0) {
            orders = this.props.orders
                .map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        id={order.id}
                        deleteOrder={this.props.onDeleteOrder}
                    />
                ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
        onDeleteOrder: id => dispatch(actions.deleteOrder(id)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
