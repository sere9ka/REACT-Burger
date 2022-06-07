import style from '../modal.module.css'
import { useContext } from 'react';
import PropTypes from 'prop-types';
import orderImg from '../../../image/ok-order.svg'
import { ingredientsContext } from '../../../Context/Context';

const OrderDetails = () => {
    const { order } = useContext(ingredientsContext)

    return (
        <div className={`${style.modalOrder} ${style.modal}`}>
            
            <div className={`${style.headerModal}`}>
                <h2 className={`${style.modalOrderTitle} text text_type_digits-large`}>{order.number ? order.number : 0}</h2>
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