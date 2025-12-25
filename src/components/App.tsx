import { useEffect } from "react";
import HistoryRouter from './history-route'
import { Route, Routes } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../const";
import MainScreen from "../pages/main-screen/main-screen";
import Layout from "./layout/layout";
import { useAppDispatch, useAppSelector } from "../hooks";
import { checkAuthAction } from "../store/api-actions";
import ProfileScreen from "@/pages/profile-sceen/profile-sceen";
import { PrivateRoute } from "./PrivateRoute";
import MembersScreen from "@/pages/members-screen/members-screen";
import EventsScreen from "@/pages/events-screen/events-screen";
import { getAuthLoadingStatus } from "@/store/slices/user-slice";
import browserHistory from "@/browser-history";
import BidScreen from "@/pages/bid-screen/bid-screen";

function App() {
  const dispatch = useAppDispatch();
  const isAuthLoading = useAppSelector(getAuthLoadingStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (isAuthLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Загрузка...
      </div>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout />}
        >
          <Route
            index
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Profile}
            element={
              <PrivateRoute 
                allowedRoles={[
                  AuthorizationStatus.USER,
                  AuthorizationStatus.ADMIN,
                  AuthorizationStatus.NEW_BID,
                  AuthorizationStatus.REJECTED_BID
                ]}
              >
                <ProfileScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Members}
            element={
              <PrivateRoute 
                allowedRoles={[
                  AuthorizationStatus.USER,
                  AuthorizationStatus.ADMIN,
                ]}
              >
                <MembersScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Events}
            element={
              <PrivateRoute 
                allowedRoles={[
                  AuthorizationStatus.USER,
                  AuthorizationStatus.ADMIN,
                ]}
              >
                <EventsScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Bid}
            element={
              <PrivateRoute 
                allowedRoles={[
                  AuthorizationStatus.ADMIN,
                ]}
              >
                <BidScreen />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
