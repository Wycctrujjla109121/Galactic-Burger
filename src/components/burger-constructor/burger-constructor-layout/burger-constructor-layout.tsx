import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor-layout.module.scss'
import { useSelector } from 'react-redux';
import { selectIngridientBun } from '../../../services/ingridients/ingridients-slice';

export const BurgerConstructorLayout = ({ children }: { children: React.ReactNode }) => {
    const ingridientBun = useSelector(selectIngridientBun)

    return (
        <div className={s.wrapper}>
            {
                ingridientBun &&
                <ConstructorElement
                    extraClass='ml-8'
                    type="top"
                    isLocked={true}
                    text={ingridientBun.name}
                    price={ingridientBun.price}
                    thumbnail={ingridientBun.image}
                />
            }
            <div className={s.wrapper__list}>
                {children}
            </div>
            {
                ingridientBun &&
                <ConstructorElement
                    extraClass='ml-8'
                    type="bottom"
                    isLocked={true}
                    text={ingridientBun.name}
                    price={ingridientBun.price}
                    thumbnail={ingridientBun.image}
                />
            }
        </div>
    );
};
