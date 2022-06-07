import { useContext } from 'react';
import style from '../modal.module.css'
import { IngredientsContext } from '../../../Context/Context';
import IngredientDetails from '../modalIngredients/ingredient-details'
import OrderDetails from '../modalOrder/order-details'
import PropTypes from 'prop-types';

const ModalWindowConstruct = (props) => {
    const { targetModal} = useContext(IngredientsContext)
    
    if (targetModal === 'OrderDetails') {
        return (
            <OrderDetails onClick={props.onClick} />
        )
    } else if (targetModal === 'IngredientDetails') {
        return (
                <IngredientDetails onClick={props.onClick} />
        )
    } else {
        return(
            <div className={`${style.modalWindow}`}>
                
            </div>
        )
    }
}
ModalWindowConstruct.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default ModalWindowConstruct