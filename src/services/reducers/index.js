import { GET_DATA_SUCCESS, GET_DATA_REQUEST, GET_DATA_FAILED } from "../actions/ingredients";
import { combineReducers } from 'redux';

const initialState = {
    ingredientsAll: [],
    ingredientsRequest: false,
}

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_REQUEST:
            return {...state, ingredientsRequest: true }
        case GET_DATA_SUCCESS:
            return {...state, ingredientsAll: action.items, }
        case GET_DATA_FAILED:
            return {...state, ingredientsRequest: false, }
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
}) 