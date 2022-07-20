import { checkResponse } from "./checkResponse"

// export const getData = async (url) => {
//     return await fetch(url, {mode: 'cors'})
//       .then(checkResponse)
//       .catch(err => console.error(err))
//       .catch(e => console.log(`Что-то пошло не так. Ошибка: ${e}`))
//   }

export const sendOrder = async (order, url) => {
   return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            ingredients: order.burgerIngredients
        })
    })
    .then(checkResponse)
    .catch(err => console.error(err))
}