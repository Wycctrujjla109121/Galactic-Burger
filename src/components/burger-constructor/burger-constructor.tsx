import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorLayout } from './burger-constructor-layout';

import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
    addBunIngridient,
    addIngridient,
    addMutableConstructorIngridient,
    postOrder,
    removeOrderDetailAndConstructorIngridient,
    selectConstructorIngridients,
    selectIngridientBun,
    selectOrderDetails
} from '../../services/ingridients/ingridients-slice';
import { IngridientsType } from '../../types/ingridients-type';
import { Modal } from '../modal';
import s from './burger-constructor.module.scss';
import { OrderDetails } from './order-details';
import { DraggbleIngridient } from './draggble-ingridient';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor = () => {
    const [isOpen, setIsOpen] = useState(false)

    const constructorIngridients = useSelector(selectConstructorIngridients)
    const ingridientBun = useSelector(selectIngridientBun)
    const orderDetail = useSelector(selectOrderDetails)
    const dispatch = useDispatch<AppDispatch>()

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

        dispatch(postOrder(orderIngridients))
    }

    useEffect(() => {
        orderDetail?.success === true && setIsOpen(true)
    }, [orderDetail])

    useEffect(() => {
        isOpen === false && dispatch(removeOrderDetailAndConstructorIngridient())
    }, [dispatch, isOpen])

    return (
        <section className={`${s.wrapper} mt-25`}>
            <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
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
                <Button onClick={handlePostOrder} htmlType="button" type="primary" size="large">
                    Нажми на меня
                </Button>
            </div>
        </section>
    );
};
