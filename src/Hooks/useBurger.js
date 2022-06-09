import { useState } from "react";

export const useBurger = () => {
    const [burger, setBurger] = useState({
                                    bun: null,
                                    ingredients: [],
                                })
    return {burger, setBurger}
}