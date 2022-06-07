import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import constructorStyles from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientsContext } from '../../Context/Context';


//вывод суммы стоимости ингредиентов
const Summary = (props) => {
    const { sendOrder, sumBurger } = useContext(ingredientsContext)

    return (
        <div className={`${constructorStyles.summaryForm} mt-10`} id='summary_burger'>
            <p className={`${constructorStyles.finalyPrice}`}><span className={`mr-2 text text_type_digits-medium`}>{sumBurger}</span> <CurrencyIcon /></p>
            <div className='ml-10'>
                <Button onClick={() => {
                    sendOrder()
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
const Bun = ({bun, type}) => {
    const { burger } = useContext(ingredientsContext)
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
    const { order, setOrder, ingredients, burger, setBurger, setSumBurger } = useContext(ingredientsContext)

    const getBurger = () => {
        setBurger({
            bun: undefined,
            ingredients: [] 
        })
        
        ingredients.forEach((ingredient, i) => {
            if (ingredient.type === "bun" && i === 1) {
                setBurger({
                    ...burger,
                    bun: ingredient, 
                }) 
                burger.ingredients.push(ingredient)
                setOrder({
                    ...order,
                    burgerIngredients: [ingredient._id]
                })
                
            }
            if (ingredient.type !== "bun" && i % 2 === 0) {
                burger.ingredients.push(ingredient)
                setOrder({
                    ...order,
                    burgerIngredients: [ingredient._id]
                })
            }
        });
        console.log(burger);
        console.log(order);
    }
    const calculating = () => {
        let sum = 0;
        burger.ingredients.forEach(ingredient => {
            setSumBurger(sum += ingredient.price)
        })
    }

    React.useEffect(() => {
        getBurger();
    }, [])

    React.useEffect(() => {
        calculating()
    }, [burger, ingredients])

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