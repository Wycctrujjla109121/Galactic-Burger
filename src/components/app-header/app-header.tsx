import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.scss'

export const AppHeader = () => {
    return (
        <header className={s.wrapper}>
            <nav className='pt-4 pb-4'>
                <div className={s.wrapper__menu}>
                    <a href='/' className={`pl-5 pr-5 pb-4 pt-4 ${s.wrapper__link}`}>
                        <BurgerIcon type={'primary'} />

                        <p className="text text_type_main-medium ml-2">
                            Конструктор
                        </p>
                    </a>

                    <a href='/' className={`pl-5 pr-5 pb-4 pt-4 ${s.wrapper__link}`}>
                        <ListIcon type={'secondary'} />

                        <p className="text text_type_main-medium ml-2 text_color_inactive">
                            Лента заказов
                        </p>
                    </a>
                </div>

                <Logo />

                <a href='/' className={`pl-5 pr-5 pb-4 pt-4 ${s.wrapper__link}`}>
                    <ProfileIcon type={'secondary'} />
                    <p className="text text_type_main-medium ml-2 text_color_inactive">
                        Личный кабинет
                    </p>
                </a>
            </nav>
        </header>
    );
};
