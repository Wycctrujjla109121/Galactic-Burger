import { useSelector } from 'react-redux';
import { FeedInfo, FeedList } from '../../components';
import s from './feed.module.scss';
import { selectSocket } from '../../services/ws/ws.slice';

export const FeedsPage = () => {
    const data = useSelector(selectSocket);
    const sortedOrders = data.orders && [...data.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className={s.wrapper}>
            <p className="text text_type_main-large mt-10 mb-10">
                Лента заказов
            </p>

            <div className={s.wrapper__content}>
                <FeedList orders={sortedOrders} />
                <FeedInfo orders={data.orders} ordersFullTime={data.total} ordersInDay={data.totalToday} />
            </div>
        </div>
    );
};
