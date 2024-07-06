import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ canActivate, children, redirectPath = '/', requiredRoles = [], userRoles = [] }) => {

    if (!canActivate) {
        return <Navigate to={redirectPath} replace />
    }

    if (requiredRoles.length > 0 && !requiredRoles.some(role => userRoles.map(r => r.id).includes(role))) {
        return <Navigate to={redirectPath} replace />
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute;