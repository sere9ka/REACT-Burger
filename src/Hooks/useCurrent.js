import { useState } from "react";

export const useCurrent = () => {
    const [current, setCurrent] = useState('Булки')

    return {current, setCurrent}
}