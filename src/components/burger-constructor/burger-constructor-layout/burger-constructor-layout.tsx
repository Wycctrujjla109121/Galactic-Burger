import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor-layout.module.scss'

export const BurgerConstructorLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={s.wrapper}>
            <ConstructorElement
                extraClass='ml-8'
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
            <div className={s.wrapper__list}>
                {children}
            </div>
            <ConstructorElement
                extraClass='ml-8'
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
        </div>
    );
};
