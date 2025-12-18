import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../const";
import MainScreen from "../pages/Main";
import Layout from "./layout/layout";
import { useAppDispatch, useAppSelector } from "../hooks";
import { checkAuthAction } from "../store/api-actions";
import ProfileScreen from "@/pages/Profile";
import { PrivateRoute } from "./PrivateRoute";
import MembersScreen from "@/pages/Members";
import EventsScreen from "@/pages/Events";
import { getAuthLoadingStatus } from "@/store/slices/user-slice";

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
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
