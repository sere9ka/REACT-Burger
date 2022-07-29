import { getData } from "../../Functions/getData";

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const GET_DATA_FAILED = 'GET_DATA_FAILED'
export const SET_INGREDIENT = 'SET_INGREDIENT'
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT'
export const SET_INGREDIENTSALL = 'SET_INGREDIENTSALL'

export function getItems(url) {
    return function(dispatch) {
        dispatch({
          type: GET_DATA_REQUEST
        });
        getData(url).then(res => {
          if (res && res.success) {
            dispatch({
              type: GET_DATA_SUCCESS,
              items: res.data
            });
          } else {
            dispatch({
              type: GET_DATA_FAILED
            });
          }
        });
      };
}
