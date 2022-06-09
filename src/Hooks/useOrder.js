import { useState } from "react";
import { checkResponse } from "../Functions/checkResponse";

export const useOrder = (url) => {
    const [order, setOrder] = useState({
        burgerIngredients: [],
        number: 0,
    })

    const sendOrder = () => {
        let response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ingredients: order.burgerIngredients
            })
        })
        response
            .then(checkResponse)
            .then(data => setOrder({
                ...order,
                number: data.order.number,
            }))
            .catch(err => console.error(err))
    }

    return { order, setOrder, sendOrder }
}