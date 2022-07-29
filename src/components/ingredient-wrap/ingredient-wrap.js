import React, { useContext } from 'react'
import ingredientStyles from '../burger-ingredients/burger-ingredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { TabContext } from '../../Context/TabContext';
import { IngredientsContext } from '../../Context/Context';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";


export const Ingredient = ({ingredient, onClick}) => {
    const id = ingredient;
    const { handleDrag } = useContext(IngredientsContext)

    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: {id},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    return (
        !isDrag && 
        <div 
            ref={dragRef}
            draggable 
            onClick={() => {onClick(ingredient)}}
            onDrag={(e) => {handleDrag(e, ingredient)}}
            className={`${ingredientStyles.card} mb-10 mr-2`} >
            <Counter count={1} size="default"  className={`${ingredientStyles.counter}`} />
            <div className={`${ingredientStyles.cardImg}`}>
                <img className={`${ingredientStyles.img}`} src={ingredient.image} alt="картинка" />
            </div>
            <div className={`${ingredientStyles.cardDesc} mt-1 pb-8`}>
                <h3 className={`${ingredientStyles.cardTitle} text text_type_digits-default mb-1`}> <span className={`mr-2`}>{ingredient.price}</span> <CurrencyIcon /></h3>
                <span className={`${ingredientStyles.cardName} cardName text text_type_main-default`}>{ingredient.name}</span>
            </div>  
        </div>
    )
}
// Ingredient.propTypes = {
//     ingredient: PropTypes.object.isRequired,
// }

export const IngredientsWrap = (props) => {
    const { tabBunRef, tabMainRef, tabSauceRef } = useContext(TabContext)
    const { ingredientsAll } = useSelector(store => store.ingredients)
    const dispatch = useDispatch()

    const buns = ingredientsAll.filter(item => item.type === 'bun')
    const mains = ingredientsAll.filter(item => item.type === 'main')
    const sauces = ingredientsAll.filter(item => item.type === 'sauce')

    return (
        <div onScroll={props.onScroll} className={`${ingredientStyles.listIngredients} mt-10`} id='listIngredients'>
            <h3 ref={tabBunRef} className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Булки</h3>
            { buns.map(ingredient => (
                    <Ingredient data-key={ingredient._id} onClick={props.onClick} ingredient={ingredient} key={ingredient._id} />
            ))}           
            <h3 ref={tabSauceRef} className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Соусы</h3>
            { sauces.map(ingredient => (
                    <Ingredient data-key={ingredient._id} onClick={props.onClick} ingredient={ingredient} key={ingredient._id} />
            ))}

            <h3 ref={tabMainRef} className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Начинки</h3>
            { mains.map(ingredient => (
                    <Ingredient data-key={ingredient._id} onClick={props.onClick} ingredient={ingredient} key={ingredient._id} />
            ))}

        </div>
    )
}