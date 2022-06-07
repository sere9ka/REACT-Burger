import React, { useContext } from 'react'
import ingredientStyles from '../burger-ingredients/burger-ingredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsContext } from '../../Context/Context';



const Ingredient = ({ingredient}) => {
    return (
        <>
            <Counter count={1} size="default"  className={`${ingredientStyles.counter}`} />
            <div className={`${ingredientStyles.cardImg}`}>
                <img className={`${ingredientStyles.img}`} src={ingredient.image} alt="картинка" />
            </div>
            <div className={`${ingredientStyles.cardDesc} mt-1 pb-8`}>
                <h3 className={`${ingredientStyles.cardTitle} text text_type_digits-default mb-1`}> <span className={`mr-2`}>{ingredient.price}</span> <CurrencyIcon /></h3>
                <span className={`${ingredientStyles.cardName} cardName text text_type_main-default`}>{ingredient.name}</span>
            </div>  
        </>
    )
}
// Ingredient.propTypes = {
//     ingredient: PropTypes.object.isRequired,
// }

export const IngredientsWrap = (props) => {
    const { ingredients } = useContext(IngredientsContext)

    const buns = ingredients.filter(item => item.type === 'bun')
    const mains = ingredients.filter(item => item.type === 'main')
    const sauces = ingredients.filter(item => item.type === 'sauce')

    return (
        <div className={`${ingredientStyles.listIngredients} mt-10`} id='listIngredients'>
            <h3 className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Булки</h3>
            { buns.map(ingredient => (
                <div data-key={ingredient._id} onClick={() => props.onClick(ingredient)} className={`${ingredientStyles.card} mb-10 mr-2`} key={ingredient._id}>
                    <Ingredient ingredient={ingredient} />
                </div>
            ))}

            <h3 className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Начинки</h3>
            { mains.map(ingredient => (
                <div data-key={ingredient._id} onClick={() => props.onClick(ingredient)} className={`${ingredientStyles.card} mb-10 mr-2`} key={ingredient._id}>
                    <Ingredient ingredient={ingredient} />
                </div>
            ))}

            <h3 className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Соусы</h3>
            { sauces.map(ingredient => (
                <div data-key={ingredient._id} onClick={() => props.onClick(ingredient)} className={`${ingredientStyles.card} mb-10 mr-2`} key={ingredient._id}>
                    <Ingredient ingredient={ingredient} />
                </div>
            ))}
        </div>
    )
}