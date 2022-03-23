import React from 'react'
import ingredientStyles from './burger-ingredients.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'


const GetIngredient = ({ingredients}) => {
    console.log(ingredients)
   return (
    <>
        { ingredients.map(ingredient => (
            <div key={ingredient._id}>{ingredient.name}</div>
        ))}
    </>
   )
}

const BurgerIngredients = (props) => {
    // console.log(props.ingredients);
    const ingredients = props.ingredients
    return (
       <section className={ingredientStyles.section}>
           <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
            <GetIngredient ingredients ={ingredients} />
       </section>
    )
}

export default BurgerIngredients
