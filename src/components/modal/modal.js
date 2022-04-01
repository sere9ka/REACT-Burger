import React from 'react';
import style from './modal.module.css'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// import ModalWindowConstruct from './modal-construct/modal-construct'
import ModalOverlay from './modal-overlay/modal-overlay'

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
    React.useEffect(() => {
        const closeByEscape = (e) => {
          if (e.key === 'Escape') {
            props.modalClose();
          }
        }
        document.addEventListener('keydown', closeByEscape)
        
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [props]);
    return ReactDOM.createPortal(
        <section className={`${props.dnone ? style.section :  style.dnone} text`}>
            {props.children}
            <ModalOverlay onClick={props.onClick} />
        </section>,
        modalRoot
    )
}
Modal.propTypes = {
    ingredientModal: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    targetModal: PropTypes.string,
    setDnone: PropTypes.func.isRequired
}
export default Modal