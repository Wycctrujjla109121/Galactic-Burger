import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorLayout } from './burger-constructor-layout';

import { nanoid } from '@reduxjs/toolkit';
import { useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
    addBunIngridient,
    addIngridient,
    addMutableConstructorIngridient,
    postOrder,
    removeOrderDetailAndConstructorIngridient,
    selectConstructorIngridients,
    selectIngridientBun,
} from '../../services/ingridients/ingridients-slice';
import { IngridientsType } from '../../types/ingridients-type';
import { Modal } from '../modal';
import s from './burger-constructor.module.scss';
import { OrderDetails } from './order-details';
import { DraggbleIngridient } from './draggble-ingridient';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { selectUser } from '../../services/user/user-slice';
import { useNavigate } from 'react-router';
import { LINKS } from '../../constants';

export const BurgerConstructor = () => {
    const [isOpen, setIsOpen] = useState(false)

    const constructorIngridients = useAppSelector(selectConstructorIngridients)
    const ingridientBun = useAppSelector(selectIngridientBun)
    const dispatch = useAppDispatch()

    const user = useAppSelector(selectUser)
    const navigate = useNavigate()

    const countPrice = useMemo(() => {
        const priceConstructor = constructorIngridients.reduce((acc, i) => acc += i.price, 0)
        const priceBun = ingridientBun ? ingridientBun.price * 2 : 0
        return priceConstructor + priceBun
    }, [ingridientBun, constructorIngridients])

    const moveIngridient = (currentElementIndex: number, hoverIndex: number) => {
        const currentIngridient = constructorIngridients[currentElementIndex]
        const mutationConstructorIngridient = [...constructorIngridients]

        mutationConstructorIngridient.splice(currentElementIndex, 1)
        mutationConstructorIngridient.splice(hoverIndex, 0, currentIngridient)

        dispatch(addMutableConstructorIngridient(mutationConstructorIngridient))
    }

    const [{ isCanDrop }, dropWrapper] = useDrop(() => ({
        accept: 'ingridients',
        drop: (item: IngridientsType) => item.type === 'bun' ? dispatch(addBunIngridient(item)) : dispatch(addIngridient({ ...item, uniqId: nanoid(10) })),
        collect: monitor => ({
            isCanDrop: !!monitor.canDrop()
        }),
    }))

    const handlePostOrder = () => {
        const orderIngridients = constructorIngridients.map(i => i._id)
        if (ingridientBun) {
            orderIngridients.push(ingridientBun?._id)
            orderIngridients.unshift(ingridientBun?._id)
        }

        if (user) {
            setIsOpen(true)
            dispatch(postOrder(orderIngridients))
        } else {
            navigate(LINKS.login)
        }
    }

    const handleClosePopup = () => {
        setIsOpen(false)
        dispatch(removeOrderDetailAndConstructorIngridient())
    }

    return (
        <section className={`${s.wrapper} mt-25`}>
            <Modal dataTestId='modal-order-popup' isOpen={isOpen} setIsOpen={handleClosePopup}>
                <OrderDetails />
            </Modal>
            <div className={s.wrapper__content} ref={dropWrapper} style={{ border: isCanDrop ? '6px dotted gray' : '6px dotted transparent' }}>
                <BurgerConstructorLayout>
                    {
                        constructorIngridients.map((ingridient, index) => (
                            <DraggbleIngridient
                                key={ingridient.uniqId}
                                ingridient={ingridient}
                                index={index}
                                moveIngridient={moveIngridient}
                            />
                        ))
                    }
                </BurgerConstructorLayout>
            </div>

            <div className={`mt-10 ${s.wrapper__info}`}>
                <div className={`mr-10 ${s.wrapper__price}`}>
                    <p className="text text_type_digits-medium mr-2">
                        {countPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button data-test-id='submit-button' onClick={handlePostOrder} htmlType="button" type="primary" size="large">
                    Нажми на меня
                </Button>
            </div>
        </section>
    );
};
