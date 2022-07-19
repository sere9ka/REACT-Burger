import { GET_DATA_SUCCESS, GET_DATA_REQUEST, GET_DATA_FAILED, SET_INGREDIENT, CLEAR_INGREDIENT, SET_BURGER_BUN, CLEAR_BURGER, SET_BURGER_INGREDIENTS } from "../actions/ingredients";
import { SET_OPEN_MODAL, SET_CLOSE_MODAL, SET_TARGET_MODAL, CLEAR_TARGET_MODAL } from "../actions/modal";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER, SET_ORDER_INGREDIENTS } from "../actions/order";
import { combineReducers } from 'redux';

const initialState = {
    ingredientsAll: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    dnone: false,
    targetModal: '',
    ingredient: {},
    burger: {
        bun: null,
        ingredients: [],
    },
    order: {
        burgerIngredients: [],
        number: 0,
    },
    orderRequest: false,
    orderFailed: false,
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {...state, orderRequest: true,  orderFailed: false }
        case GET_ORDER_SUCCESS:
            return {...state, order: action.items, orderRequest: false }
        case GET_ORDER_FAILED:
            return {...state, orderRequest: false, orderFailed: true }
        case CLEAR_ORDER: 
            return {...state, order: {}}
        case SET_ORDER_INGREDIENTS:
            return {...state, order: {
                ...state.order,
                burgerIngredients: action.burgerIngredients,
            }
            }
        default:
            return state;
    }
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OPEN_MODAL:
            return {...state, dnone: true}
        case SET_CLOSE_MODAL:
            return {...state, dnone: false, ingredient: {},}
        case SET_TARGET_MODAL:
            return {...state, targetModal: action.targetModal}
        case CLEAR_TARGET_MODAL:
            return {...state, targetModal: ''}
        default:
            return state
    }
}

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_REQUEST:
            return {...state, ingredientsRequest: true, ingredientsFailed: false }
        case GET_DATA_SUCCESS:
            return {...state, ingredientsAll: action.items, ingredientsRequest: false }
        case GET_DATA_FAILED:
            return {...state, ingredientsRequest: false, ingredientsFailed: true }
        case SET_INGREDIENT:
            return {...state, ingredient: action.ingredient, }
        case CLEAR_INGREDIENT:
            return {...state, ingredient: {}, }
        case SET_BURGER_BUN:
            return {...state, burger: {
                    ...state.burger,
                    bun: action.bun
                }}
        case SET_BURGER_INGREDIENTS:
            return {...state, burger: {
                    ...state.burger,
                    ingredients: action.ingredients
                }}
        case CLEAR_BURGER:
            return {...state, burger: {
                bun: null,
                ingredients: [],
            }}
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    orders: orderReducer
}) 