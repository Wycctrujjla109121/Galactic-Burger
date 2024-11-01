import { FeedList } from '../../components';
import s from './profile-feed.module.scss'

export const ProfileFeedPage = () => {
    return (
        <div className={s.wrapper}>
            <FeedList />
        </div>
    );
};
