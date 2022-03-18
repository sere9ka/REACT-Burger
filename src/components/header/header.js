import React from 'react'
import headerStyles from './header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const ConstructBurger = (props) => {
    return (
        <a href="/" className={headerStyles.constructorlink}>
            <BurgerIcon type='primary'></BurgerIcon>
            <span>Конструктор</span>
        </a>
    )
}
const GetListIcon = (props) => {
    return (
        <a href="/" className={headerStyles.listicon}>
            <ListIcon type='secondary'></ListIcon>
            <span>Лента заказов</span>
        </a>
    )
}
const GetProfileIcon = (props) => {
    return (
        <a href="/" className={headerStyles.profileicon}>
            <ProfileIcon type='secondary'></ProfileIcon>
            <span>Личный кабинет</span>
        </a>
    )
}

const Header = (props) => {
        return (
            <header className={headerStyles.header}>
                <div className={headerStyles.container}>
                    <ConstructBurger />
                    <GetListIcon />
                    <Logo></Logo>
                    <GetProfileIcon />
                </div>
            </header>
        )
}

export default Header