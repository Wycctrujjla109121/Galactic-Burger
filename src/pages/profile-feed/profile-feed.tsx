import { FeedList, Preloader } from '../../components';
import s from './profile-feed.module.scss'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useParams } from 'react-router';
import { fetchOrderById, reducerSocketClose, selectIsLoading, selectOrdersSocket, webSocket } from '../../services/ws/ws.slice';
import { API_Websocket_URL } from '../../constants';

export const ProfileFeedPage = () => {
    const { id } = useParams()
    const replaceId = id?.replace(':', '')
    const dispatch = useAppDispatch();
    const selectOrders = useAppSelector(selectOrdersSocket)
    const isLoadingSocket = useAppSelector(selectIsLoading)
    const ordersSort = selectOrders && [...selectOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    useEffect(() => {
        if (replaceId) {
            dispatch(fetchOrderById(replaceId))
        }
    }, [dispatch, replaceId])

    useEffect(() => {
        dispatch(webSocket({ url: `${API_Websocket_URL}/orders?token=${localStorage.getItem('accessToken')}` }))

        return () => {
            dispatch(reducerSocketClose());
        }
    }, [])

    return (
        <div className={s.wrapper}>
            {
                isLoadingSocket
                    ? <div className={s.wrapper__preloader}>
                        <Preloader />
                    </div>
                    : <FeedList orders={ordersSort} />
            }
        </div>
    );
};
