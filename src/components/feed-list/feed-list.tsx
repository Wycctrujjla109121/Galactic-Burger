import { IOrders } from '../../types/websocket.type';
import { FeedCard } from '../feed-card';
import s from './feed-list.module.scss'

export const FeedList = ({ orders }: { orders?: IOrders[] | null }) => {
    if (!orders) {
        // Заглушка
        return <></>
    }

    return (
        <div className={s.list}>
            {
                orders.map((item) => (
                    <FeedCard
                        status={item.status}
                        key={item._id}
                        orderNumber={item.number}
                        date={item.createdAt}
                        name={item.name}
                        ingridients={item.ingredients}
                    />
                ))
            }
        </div>
    );
};
