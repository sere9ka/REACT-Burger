import style from '../modal.module.css'
import IngredientDetails from '../modalIngredients/ingredient-details'
import OrderDetails from '../modalOrder/order-details'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ModalWindowConstruct = (props) => {
    const { targetModal } = useSelector(store => store.modal)
    
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