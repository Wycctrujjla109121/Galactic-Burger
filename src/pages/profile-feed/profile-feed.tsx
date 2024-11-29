import { useSelector } from 'react-redux';
import { FeedList } from '../../components';
import s from './profile-feed.module.scss'
import { fetchOrderByIdAuthorized, reducerSocketCloseAuthorized, selectSocketAuthorized, webSocketAuthorized } from '../../services/ws/ws.slice-authorized';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { useParams } from 'react-router';

export const ProfileFeedPage = () => {
    const { id } = useParams()
    const replaceId = id?.replace(':', '')
    const dispatch = useAppDispatch();
    const selectOrderByIdAuthorized = useSelector(selectSocketAuthorized)
    const ordersSort = selectOrderByIdAuthorized.orders && [...selectOrderByIdAuthorized.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    useEffect(() => {
        if (replaceId) {
            dispatch(fetchOrderByIdAuthorized(replaceId))
        }
    }, [dispatch, replaceId])

    useEffect(() => {
        dispatch(webSocketAuthorized())

        return () => {
            dispatch(reducerSocketCloseAuthorized());
        }
    }, [])

    return (
        <div className={s.wrapper}>
            <FeedList orders={ordersSort} />
        </div>
    );
};
