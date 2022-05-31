import React from 'react';
import appStyle from './app.module.css'
import AppHeader from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal';
import ModalWindowConstruct from '../modal/modal-construct/modal-construct';
import { ingredientsContext } from '../../Context/Context';
import { useIngredients } from '../../Hooks/useIngredients';
import { useIngredient } from '../../Hooks/useIngredient';
import { useDNone } from '../../Hooks/useDnone';
import { useTargetModal } from '../../Hooks/useTargetModal';

const linkData = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {
  const {ingredients, setIngredients} = useIngredients()
  const {ingredient, setIngredient} = useIngredient()
  const {dnone, setDnone} = useDNone()
  const {targetModal, setTargetModal} = useTargetModal()
  const modalClose = () => {
    setDnone(false)
}
  const display = () => {
    setDnone(!dnone)
  }
  const handleModalOrder = () => {
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
    <ingredientsContext.Provider value={
      {
        setIngredients,
        setIngredient,
        setDnone,
        setTargetModal,
        ingredients,
        ingredient,
        dnone,
        targetModal,
        modalClose
      }
    }>
      <AppHeader />
      <main>
        <div className={appStyle.container}>
          <BurgerIngredients 
            onClick={handleModalDetails} 
            ingredients={ingredients} />
          <BurgerConstructor 
            onClick={handleModalOrder} 
            ingredients={ingredients} />
        </div>
      </main>
      <Modal 
        onClick={display}
      >
          <ModalWindowConstruct onClick={display} />
      </Modal>
    </ingredientsContext.Provider>

  );
}
export default App;