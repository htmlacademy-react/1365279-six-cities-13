import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type AccessRouteProps = {
	children: ReactNode;
  status: AuthorizationStatus;
}

// eslint-disable-next-line react/display-name
const createAccessRoute = (accessStatus: AuthorizationStatus, navigateRoute: string) => ({children, status}: AccessRouteProps) => {
	if (status === accessStatus) {
		return children;
	}
	return <Navigate to={navigateRoute} />;
};

export const PrivateRoute = createAccessRoute(AuthorizationStatus.Auth, AppRoute.Login);
export const PublicRoute = createAccessRoute(AuthorizationStatus.NoAuth, AppRoute.Main);
