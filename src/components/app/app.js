import React from 'react';
import appStyle from './app.module.css'
import AppHeader from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal';
import ModalWindowConstruct from '../modal/modal-construct/modal-construct';
import { IngredientsContext } from '../../Context/Context';
import { useIngredient } from '../../Hooks/useIngredient';
import { useDNone } from '../../Hooks/useDnone';
import { useTargetModal } from '../../Hooks/useTargetModal';
import { useBurger } from '../../Hooks/useBurger';
import { useCalc } from '../../Hooks/useCalc';
import { useOrder } from '../../Hooks/useOrder';
import { getItems } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';

const baseUrl = 'https://norma.nomoreparties.space/api/'
const urlData = 'ingredients'
const urlOrder = 'orders'

const App = () => {
  const { ingredientsAll } = useSelector(store => store.ingredients)
  const dispatch = useDispatch()
  const { burger, setBurger } = useBurger()
  const { order, setOrder, sendOrder } = useOrder(`${baseUrl}${urlOrder}`)
  const { sumBurger, setSumBurger } = useCalc()
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
    dispatch(getItems(`${baseUrl}${urlData}`))
  }, [dispatch])

  return (
    <IngredientsContext.Provider value={
      {
        setSumBurger,
        setBurger,
        setIngredient,
        setDnone,
        setTargetModal,
        modalClose,
        setOrder,
        sendOrder,
        sumBurger,        
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
        { ingredientsAll.length > 0 ? <BurgerIngredients 
            onClick={handleModalDetails} /> : <></> }
         
          { ingredientsAll.length > 0 ? <BurgerConstructor 
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