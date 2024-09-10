import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorLayout } from './burger-constructor-layout';

import s from './burger-constructor.module.scss';
import { Modal } from '../modal';
import { OrderDetails } from './order-details';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIngridients } from '../../services/ingridients/ingridients-slice';

export const BurgerConstructor = () => {

    const [isOpen, setIsOpen] = useState(false)

    const ingridients = useSelector(selectIngridients)

    return (
        <section className={`${s.wrapper} mt-25`}>
            <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                <OrderDetails />
            </Modal>
            <BurgerConstructorLayout>
                {
                    ingridients.map(ingridient => (
                        <div className={s.wrapper__item} key={ingridient._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                extraClass='ml-2 mt-4'
                                text={ingridient.name}
                                price={ingridient.price}
                                thumbnail={ingridient.image}
                            />
                        </div>
                    ))
                }
            </BurgerConstructorLayout>

            <div className={`mt-10 ${s.wrapper__info}`}>
                <div className={`mr-10 ${s.wrapper__price}`}>
                    <p className="text text_type_digits-medium mr-2">
                        625
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => setIsOpen(true)} htmlType="button" type="primary" size="large">
                    Нажми на меня
                </Button>
            </div>
        </section>
    );
};
