import React from 'react';
import appStyle from './app.module.css'
import style from '../modal/modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'


import AppHeader from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal';
import ModalWindowConstruct from '../modal/modal-construct/modal-construct';

const linkData = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {
  const [ingredients, setIngredients] = React.useState([])
  const [ingredient, setIngredient] = React.useState({})
  const [dnone, setDnone] = React.useState(false)
  const [targetModal, setTargetModal] =  React.useState('')
  const modalClose = () => {
    setDnone(false)
}
  const display = () => {
    setDnone(!dnone)
  }
  const handleModalOrder = (e) => {
    setTargetModal('OrderDetails')
    display()
  }
  const handleModalDetails = (ingredient) => {
    setTargetModal('IngredientDetails')
    setIngredient(ingredient)
    display()
  }

  const getData = () => {
    fetch(linkData)
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => {
        setIngredients(data.data)
      })
      .catch(e => console.log(`Что-то пошло не так. Ошибка: ${e}`))
  }
  React.useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <AppHeader />
      <main>
        <div className={appStyle.container}>
          <BurgerIngredients 
          onClick={handleModalDetails} 
          // ref={ingredientRef} 
          ingredients={ingredients} />
          <BurgerConstructor 
          onClick={handleModalOrder} 
          // ref={orderRef} 
          ingredients={ingredients} />
        </div>
      </main>
      <Modal 
        // ref={overlayRef}
        onClick={display}
        dnone={dnone}
        setDnone={setDnone}
        targetModal={targetModal}
        ingredientModal={ingredient}
        modalClose={modalClose}
      >
          <ModalWindowConstruct onClick={display}
            dnone={dnone}
            setDnone={setDnone}
            targetModal={targetModal}
            ingredientModal={ingredient}
            modalClose={modalClose} />
      </Modal>
    </>

  );
}
export default App;