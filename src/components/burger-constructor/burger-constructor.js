import React from 'react'
import PropTypes from 'prop-types';
import constructorStyles from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

//вывод суммы стоимости ингредиентов
const Summary = () => {
    return (
        <div className={`${constructorStyles.summaryForm} mt-10`}>
            <p className={`${constructorStyles.finalyPrice}`}><span className={`mr-2 text text_type_digits-medium`}>610</span> <CurrencyIcon /></p>
            <div className='ml-10'>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}
const Bun = ({bun, type}) => {
    return (
        <div className={`${constructorStyles.card} mt-2 mb-2 mr-2`} id={`${(type === 'top') ? 'bunTop' : 'bunBottom'}`}>
            <ConstructorElement className={`${constructorStyles.card}`}
                type = {type}
                isLocked={true}
                text={`${bun.name} ${(type === 'top') ? '(Верх)' : '(Низ)'}`}
                price={`${bun.price}`}
                thumbnail={`${bun.image_large}`}
            />
        </div>
    )
}

Bun.propTypes = {
    type: PropTypes.string.isRequired,
    bun: PropTypes.object.isRequired
    
}
//вывод ингредиентов
const Burger = ({ingredients}) => {
    let bun = {}
    ingredients.forEach((ingr, i) => {
        if (i < 1) {
            bun = ingr
        }
    });
    return (
        <>
            
            <div className={`${constructorStyles.burger}`} id="constructor_ingredients">
                <Bun bun={bun} type={'top'} />
                <div className={`${constructorStyles.ingredientsBurger}`}>
                    { ingredients.filter(item => item.type !== 'bun').map((ingredient) => (
                        <div className={`${constructorStyles.cardIngr} mt-2 mb-2`} key={ingredient._id}>
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
                <Bun bun={bun} type={'bottom'} />
            </div>
            
        <Summary />
        </>
    )
}
Burger.propTypes = {
    ingredients: PropTypes.array.isRequired,
}

const BurgerConstructor = (props) => {
    const ingredients = props.ingredients
    return (
        <section className={`${constructorStyles.section} pt-25`}>
            <Burger ingredients={ingredients} />
        </section>
    )
}
BurgerConstructor.propTypes = {
    ingredients: PropTypes.array.isRequired
}


export default BurgerConstructor