import { useState, useEffect } from "react";

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
            .then(response => response.json())
            .then(data => setOrder({
                ...order,
                number: data.order.number,
            }))
        
        console.log(order);
        console.log(JSON.stringify({
            ingredients: order.burgerIngredients
        }));
    }

    return { order, setOrder, sendOrder }
}