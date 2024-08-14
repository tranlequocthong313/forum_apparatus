import {Navigate, RouteProps} from "react-router-dom";
import React from "react";
import {useAuth} from "../hooks/useAuth";


export type ProtectedRouteProps = RouteProps & {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;