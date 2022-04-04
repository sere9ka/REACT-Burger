import React from 'react'
import PropTypes from 'prop-types';
import ingredientStyles from './burger-ingredients.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

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
Ingredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
}

const ListIngredient = (props) => {
    const [current, setCurrent] = React.useState('Булки')
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
            <div className={`${ingredientStyles.listIngredients} mt-10`} id='listIngredients'>
                <h3 className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Булки</h3>
                    { props.ingredients.filter(item => item.type === 'bun').map(ingredient => (
                        <div data-key={ingredient._id} onClick={() => props.onClick(ingredient)} className={`${ingredientStyles.card} mb-10 mr-2`} id="bun" key={ingredient._id}>
                            <Ingredient ingredient={ingredient} />
                        </div>
                    ))}
                <h3 className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Соусы</h3>
                    { props.ingredients.filter(item => item.type === 'sauce').map(ingredient => (
                        <div data-key={ingredient._id} onClick={() => props.onClick(ingredient)} className={`${ingredientStyles.card} mb-10 mr-2`} id="bun" key={ingredient._id}>
                            <Ingredient ingredient={ingredient} />
                        </div>
                    ))}
                <h3 className={`text text_type_main-small mb-6 ${ingredientStyles.menuTitle}`}>Наполнители</h3>
                    { props.ingredients.filter(item => item.type === 'main').map(ingredient => (
                        <div data-key={ingredient._id} onClick={() => props.onClick(ingredient)} className={`${ingredientStyles.card} mb-10 mr-2`} id="bun" key={ingredient._id}>
                            <Ingredient ingredient={ingredient} />
                        </div>
                    ))}
            </div>
        </>
   )
}

ListIngredient.propTypes = {
    ingredients: PropTypes.array,
    onClick: PropTypes.func.isRequired
}

const BurgerIngredients = (props) => {
    const ingredients = props.ingredients
    return (
       <section className={ingredientStyles.section}>
           <h2 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h2>
            <ListIngredient onClick={props.onClick} ingredients ={ingredients} />
       </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
}


export default BurgerIngredients
