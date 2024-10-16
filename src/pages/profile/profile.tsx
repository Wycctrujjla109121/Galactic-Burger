import { Outlet } from "react-router";

import s from './profile.module.scss'
import { ProfileMenu } from "../../components";

export const ProfilePage = () => {
    return (
        <div className={s.wrapper}>
            <ProfileMenu />
            <Outlet />
        </div>
    );
};
