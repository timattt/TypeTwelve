import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from 'react-redux'
import PrivateRoutes from "./pages/private-route";
import LoginPage from "./pages/login-page";
import UnauthorizedPage from "./pages/unauthorized-page";
import HomePage from "./pages/home-page";
import SuccessfulAuthorizationPage from "./pages/successful-authorization-page";
import CodePage from "./pages/code-page";
import store from './store/store';
import Header from "./pages/header";
import MessengerPage from "./pages/messenger-page";
import ChatPage from "./pages/chat-page";

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
            <Route element={<ChatPage/>} path="/chat/:id"/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App;
