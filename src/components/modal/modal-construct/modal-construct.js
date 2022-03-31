import React from 'react';
import style from '../modal.module.css'

import IngredientDetails from '../modalIngredients/ingredient-details'
import OrderDetails from '../modalOrder/order-details'

import PropTypes from 'prop-types';

const ModalWindowConstruct = (props) => {
    if (props.targetModal === 'OrderDetails') {
        return (
            <div className={`${style.modalWindow}`}>
                <OrderDetails onClick={props.onClick} />
            </div>
        )
    } else if (props.targetModal === 'IngredientDetails') {
        return (
            <div className={`${style.modalWindow}`}>
                <IngredientDetails onClick={props.onClick} ingredientModal={props.ingredientModal}/>
            </div>
        )
    } else {
        return(
            <div className={`${style.modalWindow}`}>
                
            </div>
        )
    }
}
ModalWindowConstruct.propTypes = {
    ingredientModal: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    targetModal: PropTypes.string
}

export default ModalWindowConstruct