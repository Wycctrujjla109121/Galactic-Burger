import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthChecked, selectUser } from "../../services/user/user-slice";
import { Navigate, useLocation } from "react-router";
import { LINKS } from "../../constants";

export const ProtectedRoute = ({ page, onlyAuth = false }: { page: ReactElement, onlyAuth?: boolean }) => {
    const user = useSelector(selectUser)
    const isAuthChecked = useSelector(selectIsAuthChecked)
    const location = useLocation()

    if (!isAuthChecked) {
        return <>...Загрузка</>
    }

    if (!onlyAuth && !user) {
        return <Navigate to={LINKS.login} state={{ from: location }} />
    }

    if (onlyAuth && user) {
        const { from } = location.state ?? { from: { pathname: LINKS.main } }
        return <Navigate to={from} />
    }

    return page
};

export const AuthUser = ProtectedRoute
export const NotAuthUser = ({ page }: { page: ReactElement }) => <ProtectedRoute onlyAuth={true} page={page} /> 
