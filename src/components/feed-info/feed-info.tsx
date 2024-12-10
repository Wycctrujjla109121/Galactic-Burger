import s from './feed-info.module.scss'
import { IOrders } from '../../types/websocket.type';

export const FeedInfo = ({ orders, ordersFullTime, ordersInDay }: { orders?: IOrders[] | null, ordersFullTime: number, ordersInDay: number }) => {

    if (!orders) {
        // Заглушка
        return <></>
    }

    const ordersDone = orders.filter(item => item.status === 'done')
    const ordersInProgress = orders.filter(item => item.status !== 'done')

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__header}>
                {
                    ordersDone.length > 0 &&
                    <div className={s.wrapper__column}>
                        <p className="text text_type_main-medium mb-6">
                            Готовы:
                        </p>
                        <div className={s.wrapper__list}>
                            {
                                ordersDone.map(item => (
                                    <p key={item._id} className={`text text_type_digits-default mb-2 ${s.wrapper__green}`}>{item.number}</p>
                                ))
                            }
                        </div>
                    </div>
                }
                {
                    ordersInProgress.length > 0 &&
                    <div className={s.wrapper__column}>
                        <p className="text text_type_main-medium mb-6">
                            В работе:
                        </p>
                        <div className={s.wrapper__list}>
                            {
                                ordersInProgress.map(item => (
                                    <p key={item._id} className="text text_type_digits-default mb-2">{item.number}</p>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
            <div className={s.wrapper__info}>
                <p className="text text_type_main-small">
                    Выполнено за все время:
                </p>
                <p className="text text_type_digits-large">{ordersFullTime}</p>
            </div>
            <div className={s.wrapper__info}>
                <p className="text text_type_main-small">
                    Выполнено за сегодня:
                </p>
                <p className="text text_type_digits-large">{ordersInDay}</p>
            </div>
        </div>
    );
};
