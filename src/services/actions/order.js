import { sendOrder } from "../../Functions/sendOrder";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'
export const CLEAR_ORDER = 'CLEAR_ORDER'
export const SET_ORDER_INGREDIENTS = 'SET_ORDER_INGREDIENTS'
export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER'

export function getOrder( dispatch, order, url ) {
    dispatch({
          type: GET_ORDER_REQUEST
        });
    sendOrder(order, url).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          items: res.order
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
}
    