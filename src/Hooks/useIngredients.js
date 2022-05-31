import { useState } from "react";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState([])
    return {ingredients, setIngredients}
}