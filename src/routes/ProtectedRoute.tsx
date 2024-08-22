import { Navigate, RouteProps } from "react-router-dom";
import React from "react";
import { useUser } from "../hooks/useUser";

export type ProtectedRouteProps = RouteProps & {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const user = useUser()

	if (!user?.isLoggedIn) {
		return <></>
	}
	return <>{children}</>;
}

export default ProtectedRoute;
