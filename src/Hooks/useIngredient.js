import { useState } from "react";

export const useIngredient = () => {
    const [ingredient, setIngredient] = useState({})
    return {ingredient, setIngredient}
}