import { useState } from "react";

export const useCalc = () => {
    const [sumBurger, setSumBurger] = useState(0)
    return {sumBurger, setSumBurger}
}