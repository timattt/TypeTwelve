import { thunk } from 'redux-thunk'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from 'react-redux'
import {rootReducer} from "./store/reducers/root-reducer";
import PrivateRoutes from "./pages/private-route";
import LoginPage from "./pages/login-page";
import UnauthorizedPage from "./pages/unauthorized-page";
import HomePage from "./pages/home-page";
import SuccessfulAuthorizationPage from "./pages/successful-authorization-page";
import CodePage from "./pages/code-page";
import { configureStore } from '@reduxjs/toolkit'
import Header from "./pages/header";
import MessengerPage from "./pages/messenger-page";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

function App() {
  return <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Header/>} path="/">
          <Route element={<LoginPage/>} path="/login"/>
          <Route element={<UnauthorizedPage/>} path="/unauthorized"/>
          <Route element={<HomePage/>} path="/"/>
          <Route element={<CodePage/>} path="/code"/>
          <Route element={<PrivateRoutes />}>
            <Route element={<SuccessfulAuthorizationPage/>} path="/authorized"/>
            <Route element={<MessengerPage/>} path="/messenger"/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App;
