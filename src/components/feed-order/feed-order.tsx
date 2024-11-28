import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './feed-order.module.scss'
import { useSelector } from 'react-redux';
import { fetchOrderById, selectOdrerById } from '../../services/ws/ws.slice';
import { useParams } from 'react-router';
import { ORDER_STATUS } from '../../constants/status';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { selectIngridients } from '../../services/ingridients/ingridients-slice';
import { Preloader } from '../preloader';

export const FeedOrder = () => {
    const { id } = useParams()
    const replaceId = id?.replace(':', '')
    const orderById = useSelector(selectOdrerById)
    const ingridients = useSelector(selectIngridients)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (replaceId) {
            dispatch(fetchOrderById(replaceId))
        }
    }, [dispatch, replaceId])

    const findIngridients = ingridients.filter(ingridient => (orderById?.ingredients as unknown as string[])?.includes(ingridient._id))

    if (!orderById) {
        return (
            // Заглушка
            <Preloader />
        )
    }

    return (
        <div className={`${s.wrapper} mb-15`}>
            <div className={s.header}>
                <p className="text text_type_main-medium">{orderById.name}</p>
                <p className={`text text_type_main-small ${s.header__text_color}`}>{ORDER_STATUS[orderById.status]}</p>
            </div>
            <p className={`mb-6 text text_type_main-medium ${s.wrapper__title}`}>Состав:</p>
            <div className={s.wrapper__list}>
                {
                    findIngridients.map((item) => (
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
                }
            </div>
            <div className={`mt-10 ${s.footer}`}>
                <p className="text text_type_main-small text_color_inactive">
                    <FormattedDate date={new Date(orderById?.updatedAt)} />
                </p>
                <p className={`text text_type_digits-default ${s.footer__price}`}>
                    {
                        findIngridients.reduce((acc, prev) => acc += prev.price, 0)
                    }
                    <CurrencyIcon type={'primary'} />
                </p>
            </div>
        </div>
    );
};
