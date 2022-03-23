import React from 'react'
import constructorStyles from './burger-constructor.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = (props) => {
    return (
        <section className={`${constructorStyles.section}`}>
            <h2>Hello Constructor</h2>
        </section>
    )
}

export default BurgerConstructor