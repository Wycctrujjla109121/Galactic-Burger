import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, NavLinkRenderProps } from 'react-router-dom';
import { LINKS } from '../../constants';
import s from './app-header.module.scss';
import { Fragment } from 'react/jsx-runtime';

export const AppHeader = () => {

    return (
        <header className={s.wrapper}>
            <nav className='pt-4 pb-4'>
                <div className={s.wrapper__menu}>
                    <NavLink to={LINKS.main} className={`pl-5 pr-5 pb-4 pt-4 ${s.wrapper__link}`}>
                        {({ isActive }: NavLinkRenderProps) => (
                            <Fragment>
                                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />

                                <p className={`text text_type_main-medium ml-2 ${!isActive && 'text_color_inactive'}`}>
                                    Конструктор
                                </p>
                            </Fragment>
                        )}
                    </NavLink>

                    <NavLink to={LINKS.order} className={`pl-5 pr-5 pb-4 pt-4 ${s.wrapper__link}`}>
                        {({ isActive }: NavLinkRenderProps) => (
                            <Fragment>
                                <ListIcon type={isActive ? 'primary' : 'secondary'} />

                                <p className={`text text_type_main-medium ml-2 ${!isActive && 'text_color_inactive'}`}>
                                    Лента заказов
                                </p>
                            </Fragment>
                        )}

                    </NavLink>
                </div>

                <Logo />

                <NavLink to={LINKS.profile} className={`pl-5 pr-5 pb-4 pt-4 ${s.wrapper__link}`}>
                    {({ isActive }: NavLinkRenderProps) => (
                        <Fragment>
                            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                            <p className={`text text_type_main-medium ml-2 ${!isActive && 'text_color_inactive'}`}>
                                Личный кабинет
                            </p>
                        </Fragment>
                    )}
                </NavLink>
            </nav>
        </header>
    );
};
