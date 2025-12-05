import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppRoute } from "../const"
import MainScreen from "../pages/Main"
import Layout from "./layout/layout"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={AppRoute.Home}
            element={<MainScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
