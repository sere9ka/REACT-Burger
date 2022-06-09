import { useState } from "react";

export const useDNone = () => {
    const [dnone, setDnone] = useState(false)
    return {dnone, setDnone}
}