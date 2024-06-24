import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ canActivate, children, redirectPath = '/', RequiredRoles = [], userRoles = [] }) => {

    if (!canActivate) {
        return <Navigate to={redirectPath} replace />
    }

    if (RequiredRoles.length > 0 && !RequiredRoles.some(role => userRoles.map(r => r.code).includes(role))) {
        return <Navigate to={redirectPath} replace />
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute;