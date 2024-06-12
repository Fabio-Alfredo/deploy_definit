import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({canActivate, redirectPath = '/'}) => {

    if (!canActivate) {
        console.log("no hay token");
        return <Navigate to={redirectPath} replace/>
    }
    console.log("si hay token");
    return <Outlet />
}

export default ProtectedRoute;