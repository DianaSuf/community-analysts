import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { getAuthorizationStatus } from '../store/slices/user-slice';
import { AppRoute } from '../const';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (!allowedRoles.includes(authorizationStatus)) {
    return <Navigate to={AppRoute.Main} replace />;
  }

  return children;
}
