import { useState } from "react";
import { checkResponse } from "../Functions/checkResponse";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState([])

    const getData = (url) => {
        fetch(url, {mode: 'cors'})
          .then(checkResponse)
          .then(data => {
            setIngredients(data.data)
          })
          .catch(err => console.error(err))
          .catch(e => console.log(`Что-то пошло не так. Ошибка: ${e}`))
      }

    return {ingredients, setIngredients, getData}
}