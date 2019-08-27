import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

/**
 * Purchase burger functions
 */
const purchaseInit = (state) => updateObject(state, {purchased: false});

const purchaseBurgerStart = (state) => updateObject(state, {loading: true});

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
    });
};

const purchaseBurgerFail = (state) => updateObject(state, {loading: false});

/**
 * Get order functions
 */
const fetchOrdersStart = (state) => updateObject(state, {loading: true});

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: [...action.orders],
        loading: false,
    });    
};

const fetchOrdersFail = (state) => updateObject(state, {loading: false});

/**
 * Delete order functions
 */
const deleteOrderStart = (state) => updateObject(state, {loading: true});

const deleteOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: state.orders.filter(x => x.id !== action.id),
        loading: false
    });
};

const deleteOrderFail = (state) => updateObject(state, {loading: false});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);           
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);

        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);

        case actionTypes.DELETE_ORDER_START: return deleteOrderStart(state);
        case actionTypes.DELETE_ORDER_SUCCESS: return deleteOrderSuccess(state, action);
        case actionTypes.DELETE_ORDER_FAIL: return deleteOrderFail(state);
        
        default: return state;
    }
};

export default reducer;
