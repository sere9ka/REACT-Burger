import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import constructorStyles from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsContext } from '../../Context/Context';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_BURGER, SET_BURGER_BUN, SET_BURGER_INGREDIENTS } from '../../services/actions/ingredients';
import { CLEAR_ORDER, SET_ORDER_INGREDIENTS } from '../../services/actions/order';
import { getOrder } from '../../services/actions/order';
import { baseUrl, urlOrder } from '../app/app';

//вывод суммы стоимости ингредиентов
const Summary = (props) => {
    const { sumBurger } = useContext(IngredientsContext)
    const { order } = useSelector(store => store.orders)
    const dispatch = useDispatch()
    const url = `${baseUrl}${urlOrder}`

    return (
        <div className={`${constructorStyles.summaryForm} mt-10`} id='summary_burger'>
            <p className={`${constructorStyles.finalyPrice}`}><span className={`mr-2 text text_type_digits-medium`}>{sumBurger}</span> <CurrencyIcon /></p>
            <div className='ml-10'>
                <Button onClick={() => {
                    getOrder(dispatch, order, url)
                    props.onClick()
                }} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}
Summary.propTypes = {
    onClick: PropTypes.func.isRequired
    
}
const Bun = ({ type }) => {
    const { burger } = useSelector(store => store.ingredients)
    return (
        <div className={`${constructorStyles.card} mt-2 mb-2 mr-2`} id={`${(type === 'top') ? 'bunTop' : 'bunBottom'}`}>
            <ConstructorElement className={`${constructorStyles.card}`}
                type = {type}
                isLocked={true}
                text={`${burger.bun.name} ${(type === 'top') ? '(Верх)' : '(Низ)'}`}
                price={`${burger.bun.price}`}
                thumbnail={`${burger.bun.image_large}`}
            />
        </div>
    )
}

Bun.propTypes = {
    type: PropTypes.string.isRequired,  
}
//вывод ингредиентов
const Burger =  (props) => {
    const ingredients = []
    const ingredientsId = []
    const { setSumBurger, sumBurger } = useContext(IngredientsContext)

    const { ingredientsAll, burger } = useSelector(store => store.ingredients)
    const dispatch = useDispatch()

    const getBurger = () => {     
        ingredientsAll.forEach((ingredient, i) => {
            if (ingredient.type === "bun" && i === 1) {
                dispatch({
                    type: SET_BURGER_BUN,
                    bun: ingredient
                })
                ingredients.push(ingredient)
                ingredientsId.push([ingredient._id])
                dispatch({
                    type: SET_ORDER_INGREDIENTS,
                    burgerIngredients: ingredientsId
                })
            }
            if (ingredient.type !== "bun" && i % 2 === 0) {
                ingredients.push(ingredient)
                dispatch({
                    type: SET_BURGER_INGREDIENTS,
                    ingredients: ingredients,
                })
                ingredientsId.push([ingredient._id])
                dispatch({
                    type: SET_ORDER_INGREDIENTS,
                    burgerIngredients: ingredientsId
                })
            }
        });
    }
    const calculating = (burger) => {
        burger.ingredients.forEach(ingredient => {
            setSumBurger(sumBurger + ingredient.price)
        })
    }

    React.useEffect(() => {
        dispatch({
            type: CLEAR_BURGER
        })
        dispatch({
            type: CLEAR_ORDER
        })
        getBurger();
    }, [])

    React.useEffect(() => {
        calculating(burger)
    }, [burger, burger.ingredients])

    return (
        <> 
            <div className={`${constructorStyles.burger}`} id="constructor_ingredients">
                { burger.bun !== null ? <Bun bun={burger.bun} type={'top'} /> : <></> }
                <div className={`${constructorStyles.ingredientsBurger}`}>
                    { burger.ingredients.filter(item => item.type !== 'bun').map((ingredient, i) => (
                        <div className={`${constructorStyles.cardIngr} mt-2 mb-2`} key={ingredient._id + i}>
                            <DragIcon />
                            <ConstructorElement 
                                type=''
                                isLocked={false}
                                text={`${ingredient.name}`}
                                price={`${ingredient.price}`}
                                thumbnail={`${ingredient.image_large}`}
                            />
                        </div>
                    ))}
                </div>
                { burger.bun !== null ? <Bun bun={burger.bun} type={'bottom'} /> : <></> }
            </div>
            
        <Summary onClick={props.onClick} />
        </>
    )
}
Burger.propTypes = {
    onClick: PropTypes.func.isRequired
}

const BurgerConstructor = (props) => {
    return (
        <section className={`${constructorStyles.section} pt-25`}>
            <Burger onClick={props.onClick}/>
        </section>
    )
}
BurgerConstructor.propTypes = {
    onClick: PropTypes.func.isRequired
}


export default BurgerConstructor