import { useSelector } from 'react-redux';
import { FeedList } from '../../components';
import s from './profile-feed.module.scss'
import { selectSocketAuthorized } from '../../services/ws/ws.slice-authorized';

export const ProfileFeedPage = () => {
    const selectOrderByIdAuthorized = useSelector(selectSocketAuthorized)

    return (
        <div className={s.wrapper}>
            <FeedList orders={selectOrderByIdAuthorized.orders} />
        </div>
    );
};
