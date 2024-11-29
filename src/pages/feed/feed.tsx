import { useSelector } from 'react-redux';
import { FeedInfo, FeedList, Preloader } from '../../components';
import s from './feed.module.scss';
import { reducerSocketClose, selectIsLoading, selectSocket, webSocket } from '../../services/ws/ws.slice';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { API_Websocket_URL } from '../../constants';
import React from 'react';

export const FeedsPage = () => {
    const dispatch = useAppDispatch()
    const data = useSelector(selectSocket);
    const sortedOrders = data.orders && [...data.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const isLoading = useSelector(selectIsLoading)

    useEffect(() => {
        dispatch(webSocket({ url: `${API_Websocket_URL}/orders/all` }))

        return () => {
            dispatch(reducerSocketClose());
        }
    }, [])

    return (
        <div className={s.wrapper}>
            {
                isLoading
                    ? <div className={s.wrapper__preloader}>
                        <Preloader />
                    </div>
                    : <React.Fragment>
                        <p className="text text_type_main-large mt-10 mb-10">
                            Лента заказов
                        </p>

                        <div className={s.wrapper__content}>
                            <FeedList orders={sortedOrders} />
                            <FeedInfo orders={data.orders} ordersFullTime={data.total} ordersInDay={data.totalToday} />
                        </div>
                    </React.Fragment>
            }
        </div>
    );
};
