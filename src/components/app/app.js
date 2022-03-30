import React from 'react';
import appStyle from './app.module.css'
import AppHeader from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal';

const linkData = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {
  const [ingredients, setIngredients] = React.useState([])
  const [ingredient, setIngredient] = React.useState({})
  const [dnone, setDnone] = React.useState(false)
  const [targetModal, setTargetModal] =  React.useState('')
  // const orderRef = React.useRef(null)
  // const overlayRef = React.useRef(null)
  // const ingredientRef = React.useRef(null)

  const handleModal = (e) => {
    setDnone(!dnone)
    if (e.target.closest('#summary_burger')) {
      setTargetModal('OrderDetails')
    }  else if (e.target.closest('#listIngredients')) {
      setTargetModal('IngredientDetails')
      const name = e.currentTarget.querySelector('.cardName').textContent
      ingredients.filter(item => item.name === name).map(ingredient => (
        setIngredient(ingredient)
      ))
    } 
  }

  const getData = () => {
    fetch(linkData)
      .then(response => response.json())
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
          onClick={handleModal} 
          // ref={ingredientRef} 
          ingredients={ingredients} />
          <BurgerConstructor 
          onClick={handleModal} 
          // ref={orderRef} 
          ingredients={ingredients} />
        </div>
      </main>
      <Modal 
        // ref={overlayRef}
        onClick={handleModal}
        dnone={dnone}
        targetModal={targetModal}
        ingredientModal={ingredient}
      />
    </>

  );
}
export default App;