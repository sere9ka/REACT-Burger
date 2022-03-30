import React from 'react';
import style from './modal.module.css'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = (props) => {
    return (
        <div onClick={props.onClick} className={`${style.overlay}`}></div>
    )
}

const OrderDetails = () => {
    return (
        <div className={`${style.modalOrder} ${style.modal}`}>
            <h2 className={`${style.modalOrderTitle} text text_type_digits-large`}>034536</h2>
            <span className={`${style.modalOrderSubtitle} text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</span>
            <div className={`${style.modalOrderImg} mb-15`}>
                <img src="./image/ok-order.svg" alt="" />
            </div>
            <p className={`${style.modalOrderStartDesc} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`${style.modalOrderWaitDesc} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}
const IngredientDetails = (props) => {
    const ingredient = props.ingredientModal
    if (typeof ingredient['name'] !== 'undefined') {
        return (
            <div className={`${style.modalIngredient} ${style.modal} pl-10 pr-10 pt-10 pb-15`}>
                <div className={`${style.headerModal}`}>
                    <h2 className={`${style.modalIngredientTitle} text text_type_main-large`}>Детали ингредиента</h2>
                    <CloseIcon onClick={props.onClick} type="primary" />
                </div>
                <div className={`${style.modalIngredientImg}`}>
                    <img src={ingredient.image_large} alt="" />
                </div>
                <h3 className={`${style.ingredientName} text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</h3>
                <div className={`${style.nutritionValues} text text_type_main-default text_color_inactive`}>
                    <div className={`${style.nutritionValue}`}>
                        <strong className={`${style.nutritionValueTitle}`}>Каллории,ккал</strong>
                        <span className={`${style.nutritionValueNumber}`}>{ingredient.calories}</span>
                    </div>
                    <div className={`${style.nutritionValue}`}>
                        <strong className={`${style.nutritionValueTitle}`}>Белки,г</strong>
                        <span className={`${style.nutritionValueNumber}`}>{ingredient.proteins}</span>
                    </div>
                    <div className={`${style.nutritionValue}`}>
                        <strong className={`${style.nutritionValueTitle}`}>Жиры,г</strong>
                        <span className={`${style.nutritionValueNumber}`}>{ingredient.fat}</span>
                    </div>
                    <div className={`${style.nutritionValue}`}>
                        <strong className={`${style.nutritionValueTitle}`}>Углеводы,г</strong>
                        <span className={`${style.nutritionValueNumber}`}>{ingredient.carbohydrates}</span>
                    </div>
                </div>
            </div>
        )
    } else return ('')
}
IngredientDetails.propTypes = {
    ingredientModal: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

const ModalWindowConstruct = (props) => {
    if (props.targetModal === 'OrderDetails') {
        return (
            <div className={`${style.modalWindow}`}>
                <OrderDetails />
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
    ingredientModal: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    targetModal: PropTypes.string.isRequired
}
const Modal = (props) => {
    return ReactDOM.createPortal(
        <section className={`${props.dnone ? style.section :  style.dnone} text`}>
            <ModalWindowConstruct 
            onClick={props.onClick} 
            targetModal={props.targetModal} 
            ingredientModal={props.ingredientModal} />
            <ModalOverlay onClick={props.onClick} />
        </section>,
        modalRoot
    )
}
Modal.propTypes = {
    ingredientModal: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    targetModal: PropTypes.string.isRequired
}
export default Modal