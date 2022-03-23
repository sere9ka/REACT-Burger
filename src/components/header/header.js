import React from 'react'
import headerStyles from './header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const ConstructBurger = (props) => {
    return (
        <a href="/" className={`${headerStyles.constructorlink} pl-5 pr-5 pb-4 pt-4`}>
            <BurgerIcon type='primary'></BurgerIcon>
            <span className='text text_type_main-default pl-2'>Конструктор</span>
        </a>
    )
}
const GetListIcon = (props) => {
    return (
        <a href="/" className={`${headerStyles.listicon} ml-2 pl-5 pr-5 pb-4 pt-4`}>
            <ListIcon type='secondary'></ListIcon>  
            <span className='text text_type_main-default pl-2'>Лента заказов</span>
        </a>
    )
}
const GetProfileIcon = (props) => {
    return (
        <a href="/" className={`${headerStyles.profileicon} pl-5 pr-5 pb-4 pt-4`}>
            <ProfileIcon type='secondary'></ProfileIcon>  
            <span className='text text_type_main-default pl-2'>Личный кабинет</span>
        </a>
    )
}

const AppHeader = (props) => {
        return (
            <header className={`${headerStyles.header} pt-4 pb-4`}>
                <div className={headerStyles.container}>
                    <nav className={headerStyles.navbar}>
                        <ConstructBurger />
                        <GetListIcon />                        
                    </nav>
                    <a href="/" className={headerStyles.logo}>
                        <Logo />
                    </a>
                    <GetProfileIcon />
                </div>
            </header>
        )
}

export default AppHeader