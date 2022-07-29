import React, { useRef } from 'react'
import PropTypes from 'prop-types';
import ingredientStyles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsWrap } from '../ingredient-wrap/ingredient-wrap';
import { useCurrent } from '../../Hooks/useCurrent';
import { TabContext } from '../../Context/TabContext';

const ListIngredient = (props) => {
    const {current, setCurrent} = useCurrent()
    const tabBunRef = useRef(null)
    const tabMainRef = useRef(null)
    const tabSauceRef = useRef(null)

    const scrollingIngredients = (e) => {
        const boxTop = e.target.getBoundingClientRect().y
        const boxTabBunY = tabBunRef.current.getBoundingClientRect().y
        const boxTabMainY = tabMainRef.current.getBoundingClientRect().y
        const boxTabSauceY = tabSauceRef.current.getBoundingClientRect().y

        const tabBunDiffY = boxTabBunY - boxTop
        const tabMainDiffY = boxTabMainY - boxTop
        const tabSauceDiffY = boxTabSauceY - boxTop

        if ((tabBunDiffY * -1) < tabSauceDiffY) {
            setCurrent('Булки')
        } else if (tabSauceDiffY < tabMainDiffY 
                    &&  tabSauceDiffY < 0 - (tabBunDiffY * -1)  
                    || (tabSauceDiffY * -1) < tabMainDiffY
                    ) {
            setCurrent('Соусы')
        } else if (tabMainDiffY > tabSauceDiffY) {
            setCurrent('Начинки')
        }
    }

    return (
        <TabContext.Provider value={{
            tabBunRef,
            tabMainRef,
            tabSauceRef,
        }}>
            <div className={`${ingredientStyles.flexbox}`}>
                <Tab value="Булки"  to="bun" active={current === 'Булки'} onClick={(e) => {
                    setCurrent()
                    tabBunRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }}>
                    Булки
                </Tab>
                <Tab value="Соусы" to="main" active={current === 'Соусы'} onClick={() => {
                    setCurrent()
                    tabSauceRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }}>
                    Соусы
                </Tab>
                <Tab value="Начинки" to="sauce" active={current === 'Начинки'} onClick={() => {
                    setCurrent()
                    tabMainRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }}>
                    Начинки
                </Tab>
            </div>
            <IngredientsWrap onScroll={scrollingIngredients} onClick={props.onClick}></IngredientsWrap>
        </TabContext.Provider>
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
