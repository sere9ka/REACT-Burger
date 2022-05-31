import { useState } from "react";

export const useTargetModal = () => {
    const [targetModal, setTargetModal] =  useState('')
    return {targetModal, setTargetModal}
}