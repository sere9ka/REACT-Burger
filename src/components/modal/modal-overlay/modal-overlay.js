import style from '../modal.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div onClick={() => {props.onClick(false)}} className={`${style.overlay}`}></div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default ModalOverlay