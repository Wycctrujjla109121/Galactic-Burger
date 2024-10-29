import { ReactElement } from "react";
import { selectIsAuthChecked, selectUser } from "../../services/user/user-slice";
import { Navigate, useLocation } from "react-router";
import { LINKS } from "../../constants";
import { ModalPreloader } from "../modal-preloader";
import { useAppSelector } from "../../services/store";

export const ProtectedRoute = ({ page, onlyAuth = false }: { page: ReactElement, onlyAuth?: boolean }) => {
    const user = useAppSelector(selectUser)
    const isAuthChecked = useAppSelector(selectIsAuthChecked)
    const location = useLocation()

    if (!isAuthChecked) {
        return <ModalPreloader />
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
