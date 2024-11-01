import { FeedInfo, FeedList } from '../../components';
import s from './feed.module.scss';

export const FeedsPage = () => {
    return (
        <div className={s.wrapper}>
            <p className="text text_type_main-large mt-10 mb-10">
                Лента заказов
            </p>

            <div className={s.wrapper__content}>
                <FeedList />
                <FeedInfo />
            </div>
        </div>
    );
};
