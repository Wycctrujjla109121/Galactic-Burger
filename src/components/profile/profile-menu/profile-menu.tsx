import { NavLink, NavLinkRenderProps, useLocation } from 'react-router-dom';
import s from './profile-menu.module.scss'
import { LINKS } from '../../../constants';
import { logout } from '../../../services/user/user-slice';
import { useAppDispatch } from '../../../services/store';

interface LinksTypes {
    href: string,
    text: string,
    isButton?: boolean
}

export const ProfileMenu = () => {
    const location = useLocation()

    const links: LinksTypes[] = [
        {
            href: LINKS.profile,
            text: 'Профиль'
        },
        {
            href: LINKS.profileOrders,
            text: 'История заказов'
        },
        {
            href: LINKS.profile,
            text: 'Выход',
            isButton: true
        }
    ]

    const dispatch = useAppDispatch()

    const handleSignOut = () => {
        dispatch(logout())
    }

    return (
        <nav className={s.wrapper}>
            {
                links.map(item => (
                    !item.isButton ?
                        <NavLink key={item.text} to={item.href} end className={s.wrapper__link}>
                            {({ isActive }: NavLinkRenderProps) => (
                                <p className={`text text_type_main-medium pr-4 pt-4 pb-4 ${!isActive && 'text_color_inactive'}`}>
                                    {item.text}
                                </p>
                            )}
                        </NavLink>
                        : <button className={s.wrapper__button} key={item.text} onClick={handleSignOut}>
                            <p className="text text_type_main-medium pr-4 pt-4 pb-4 text_color_inactive">
                                {item.text}
                            </p>
                        </button>
                ))
            }
            {
                ((location.pathname === LINKS.profile) || (location.pathname === LINKS.profileOrders)) &&
                <p className="text text_type_main-default text_color_inactive mt-20">
                    {
                        location.pathname === LINKS.profile
                            ? `В этом разделе вы можете изменить свои персональные данные`
                            : `В этом разделе вы можете посмотреть историю заказов`
                    }
                </p>
            }
        </nav>
    );
};
