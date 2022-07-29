import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import constructorStyles from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsContext } from '../../Context/Context';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_BURGER, SET_BURGER_BUN, SET_BURGER_INGREDIENTS, SET_INGREDIENTS_FOR_BURGER } from '../../services/actions/construcor';
import { CLEAR_ORDER, SET_ORDER_INGREDIENTS } from '../../services/actions/order';
import { getOrder } from '../../services/actions/order';
import { baseUrl, urlOrder } from '../app/app';
import { useDrop } from "react-dnd";
import { Ingredient } from '../ingredient-wrap/ingredient-wrap';

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
export const Burger =  ({ onClick }) => {
    const ingredientsId = []
    const { 
        setSumBurger, 
        sumBurger, 
        draggedElements,
        elements,
        setElements,
        setDraggedElements  
    } = useContext(IngredientsContext)

    const { burger, ingredients } = useSelector(store => store.burgerConst)

    const dispatch = useDispatch()

    const handleDrop = (itemId) => {
        // dispatch({
        //     type: SET_INGREDIENTSALL,
        //     items: [...ingredientsAll.filter(element => element !== itemId.id)]
        // })
        if (itemId.id.type === 'bun' && draggedElements.filter(item => item.type === 'bun').length === 0) {
            dispatch({
                type: SET_BURGER_BUN,
                bun: itemId.id
            })
            dispatch({
                type: SET_INGREDIENTS_FOR_BURGER,
                ingredient: itemId.id
            })
        } else if (itemId.id.type !== 'bun') {
            dispatch({
                type: SET_INGREDIENTS_FOR_BURGER,
                ingredient: itemId.id
            })
            dispatch({
                type: SET_BURGER_INGREDIENTS,
                ingredient: itemId.id
            })
        }
        
      }


    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            handleDrop(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const borderColor = isHover ? 'green' : 'transparent';

    const calculating = (draggedElements) => {
        draggedElements.forEach(ingredient => {
            setSumBurger(sumBurger + ingredient.price)
        })
    }

    React.useEffect(() => {
        calculating(draggedElements)
    }, [draggedElements])

    return (
    <> 
        <div 
            ref={dropTarget} 
            className={`${constructorStyles.burger}`} 
            style={{borderColor}}
            id="constructor_ingredients"
        >
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
        
        <Summary onClick={onClick} />
                
        
    </>
    )
}
Burger.propTypes = {
    onClick: PropTypes.func.isRequired
}

const BurgerConstructor = (props) => {
    return (
        <section className={`${constructorStyles.section} pt-25`}>
            {props.children}
        </section>
    )
}
BurgerConstructor.propTypes = {
    // onClick: PropTypes.func.isRequired
}


export default BurgerConstructor