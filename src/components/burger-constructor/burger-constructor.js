import React from 'react'
import constructorStyles from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

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

const Burger = ({ingredients}) => {
    const sum = 0;
    return (
        <>
        <div className={`${constructorStyles.burger}`}>
            { ingredients.map(ingredient => (
                <div className={`${constructorStyles.card} mt-2 mb-2`} id="bun" key={ingredient._id}>
                    <ConstructorElement className={`${constructorStyles.card}`}
                        type=''
                        isLocked={false}
                        text={`${ingredient.name}`}
                        price={`${ingredient.price}`}
                        thumbnail={`${ingredient.image_large}`}
                    />
                </div>
                
            ))}
        </div>
        <Summary />
        </>
    )
}


const BurgerConstructor = (props) => {
    const ingredients = props.ingredients

    console.log(ingredients);
    return (
        <section className={`${constructorStyles.section} pt-25`}>
            <Burger ingredients={ingredients} />
        </section>
    )
}

export default BurgerConstructor