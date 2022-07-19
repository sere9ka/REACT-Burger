import React from 'react';
import appStyle from './app.module.css'
import AppHeader from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal';
import ModalWindowConstruct from '../modal/modal-construct/modal-construct';
import { IngredientsContext } from '../../Context/Context';
import { useCalc } from '../../Hooks/useCalc';
import { useOrder } from '../../Hooks/useOrder';
import { CLEAR_INGREDIENT, getItems } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { SET_OPEN_MODAL, SET_CLOSE_MODAL, SET_TARGET_MODAL } from '../../services/actions/modal';
import { SET_INGREDIENT } from '../../services/actions/ingredients';

export const baseUrl = 'https://norma.nomoreparties.space/api/'
export const urlData = 'ingredients'
export const urlOrder = 'orders'

const App = () => {
  const { ingredientsAll } = useSelector(store => store.ingredients)

  const dispatch = useDispatch()

  // const { order, setOrder, sendOrder } = useOrder(`${baseUrl}${urlOrder}`)
  const { sumBurger, setSumBurger } = useCalc()

  const modalClose = () => {
    dispatch({
      type: SET_CLOSE_MODAL
    })  
  }
  const display = (set) => {
    set ? 
    dispatch({
      type: SET_OPEN_MODAL
    }) 
    : 
    dispatch({
      type: SET_CLOSE_MODAL
    })  
  }
  const handleModalOrder = () => {
    dispatch({
      type: SET_TARGET_MODAL,
      targetModal: 'OrderDetails'
    })
    display(true)
  }
  const handleModalDetails = (ingredient) => {
    dispatch({
      type: SET_TARGET_MODAL,
      targetModal: 'IngredientDetails'
    })
    dispatch({
      type: SET_INGREDIENT,
      ingredient: ingredient
    })
    display(true)
  }
  
  React.useEffect(() => {
    dispatch(getItems(`${baseUrl}${urlData}`))
  }, [dispatch])

  return (
    <IngredientsContext.Provider value={
      {
        setSumBurger,
        modalClose,
        sumBurger,        
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