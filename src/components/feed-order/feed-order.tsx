import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './feed-order.module.scss'
import { useSelector } from 'react-redux';
import { selectOrdersSocket, selectSocket, webSocket } from '../../services/ws/ws.slice';
import { useParams } from 'react-router';
import { selectIngridients } from '../../services/ingridients/ingridients-slice';
import { ORDER_STATUS } from '../../constants/status';
import { Preloader } from '../preloader';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';

export const FeedOrder = ({ withTitle }: { withTitle?: boolean }) => {
    const { id } = useParams()
    const replaceId = id?.replace(':', '')
    const ordersSocket = useSelector(selectOrdersSocket)
    const ingridients = useSelector(selectIngridients)
    const dispatch = useAppDispatch()

    if (!ordersSocket || !ingridients) {
        return (
            // Заглушка
            <Preloader />
        )
    }

    // let findOrder = ordersSocket?.find(item => item.number === Number(id?.replace(':', '')))!
    // const ingridientsOrder = findOrder.ingredients.map(item => ingridients.find(ingr => ingr._id === item)).filter(i => i !== undefined)

    console.log(ordersSocket)

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                {/* {withTitle && <p className={`text text_type_digits-default ${s.header__text}`}>#{findOrder.number}</p>}
                <p className="text text_type_main-medium">{findOrder.name}</p>
                <p className={`text text_type_main-small ${s.header__text_color}`}>{ORDER_STATUS[findOrder.status]}</p> */}
            </div>
            <p className={`mb-6 text text_type_main-medium ${s.wrapper__title}`}>Состав:</p>
            <div className={s.wrapper__list}>
                {/* {
                    ingridientsOrder &&
                    ingridientsOrder.map((item) => (
                        <div key={item?._id} className={s.item}>
                            <img className={s.item__img} src={item?.image} alt={item?.name} />
                            <p className="text text_type_main-small">{item?.name}</p>
                            <p className={`text text_type_digits-default ${s.item__price}`}>
                                {item?.type === 'bun' && '2 x '}
                                {item?.price}
                                <CurrencyIcon type={'primary'} />
                            </p>
                        </div>
                    ))
                } */}
            </div>
            <div className={`mt-10 ${s.footer}`}>
                <p className="text text_type_main-small text_color_inactive">
                    {/* <FormattedDate date={new Date(findOrder?.updatedAt)} /> */}
                </p>
                <p className={`text text_type_digits-default ${s.footer__price}`}>
                    {/*
                    {
                        ingridientsOrder.reduce((acc, prev) => acc += prev?.price!, 0)
                    }
                    */}
                    <CurrencyIcon type={'primary'} />
                </p>
            </div>
        </div>
    );
};
