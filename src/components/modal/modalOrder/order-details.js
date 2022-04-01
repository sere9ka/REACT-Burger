import React from 'react';
import style from '../modal.module.css'

import PropTypes from 'prop-types';

import orderImg from '../../../image/ok-order.svg'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'


const OrderDetails = (props) => {
    return (
        <div className={`${style.modalOrder} ${style.modal}`}>
            
            <div className={`${style.headerModal}`}>
                <h2 className={`${style.modalOrderTitle} text text_type_digits-large`}>034536</h2>
            </div>
            <span className={`${style.modalOrderSubtitle} text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</span>
            <div className={`${style.modalOrderImg} mb-15`}>
                <img src={orderImg} alt="" />
            </div>
            <p className={`${style.modalOrderStartDesc} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`${style.modalOrderWaitDesc} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}
OrderDetails.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default OrderDetails