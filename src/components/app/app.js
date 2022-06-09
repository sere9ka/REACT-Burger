import React from 'react';
import appStyle from './app.module.css'
import AppHeader from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal';
import ModalWindowConstruct from '../modal/modal-construct/modal-construct';
import { IngredientsContext } from '../../Context/Context';
import { useIngredients } from '../../Hooks/useIngredients';
import { useIngredient } from '../../Hooks/useIngredient';
import { useDNone } from '../../Hooks/useDnone';
import { useTargetModal } from '../../Hooks/useTargetModal';
import { useBurger } from '../../Hooks/useBurger';
import { useCalc } from '../../Hooks/useCalc';
import { useOrder } from '../../Hooks/useOrder';

const baseUrl = 'https://norma.nomoreparties.space/api/'
const urlData = 'ingredients'
const urlOrder = 'orders'

const App = () => {
  const { burger, setBurger } = useBurger()
  const { order, setOrder, sendOrder } = useOrder(`${baseUrl}${urlOrder}`)
  const { sumBurger, setSumBurger } = useCalc()
  const {ingredients, setIngredients, getData} = useIngredients()
  const {ingredient, setIngredient} = useIngredient()
  const {dnone, setDnone} = useDNone()
  const {targetModal, setTargetModal} = useTargetModal()

  const modalClose = () => {
    setDnone(false)
}
  const display = (set) => {
    set ? setDnone(true) : setDnone(false)   
  }
  const handleModalOrder = () => {
    setTargetModal('OrderDetails')
    display(true)
  }
  const handleModalDetails = (ingredient) => {
    setTargetModal('IngredientDetails')
    setIngredient(ingredient)
    display(true)
  }
  
  React.useEffect(() => {
    getData(`${baseUrl}${urlData}`)
  }, [])

  return (
    <IngredientsContext.Provider value={
      {
        setSumBurger,
        setIngredients,
        setBurger,
        setIngredient,
        setDnone,
        setTargetModal,
        modalClose,
        setOrder,
        sendOrder,
        sumBurger,        
        ingredients,
        burger,
        ingredient,
        dnone,
        targetModal,
        order
      }
    }>
      <AppHeader />
      <main>
        <div className={appStyle.container}>
        { ingredients.length > 0 ? <BurgerIngredients 
            onClick={handleModalDetails} /> : <></> }
         
          { ingredients.length > 0 ? <BurgerConstructor 
            onClick={handleModalOrder} /> : <></> }
        </div>
      </main>
      <Modal 
        onClick={() => {display(false)}}
      >
          <ModalWindowConstruct onClick={display} />
      </Modal>
    </IngredientsContext.Provider>

  );
}
export default App;