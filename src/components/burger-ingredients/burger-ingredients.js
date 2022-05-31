import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import ingredientStyles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsWrap } from '../ingredient-wrap/ingredient-wrap';
import { useCurrent } from '../../Hooks/useCurrent';

const ListIngredient = (props) => {
    const {current, setCurrent} = useCurrent()
    return (
        <>
            <div className={`${ingredientStyles.flexbox}`}>
                <Tab value="Булки"  to="bun" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" to="main" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" to="sauce" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <IngredientsWrap onClick={props.onClick}></IngredientsWrap>
        </>
   )
}

ListIngredient.propTypes = {
    onClick: PropTypes.func.isRequired
}

const BurgerIngredients = (props) => {
    return (
       <section className={ingredientStyles.section}>
           <h2 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
            <ListIngredient onClick={props.onClick} />
       </section>
    )
}

BurgerIngredients.propTypes = {
    onClick: PropTypes.func.isRequired
}


export default BurgerIngredients
