import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppRoute } from "../const"
import HomeScreen from "../pages/Home"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Home}
          element={<HomeScreen />}
        />
      </Routes>
    </BrowserRouter>
  )
}
