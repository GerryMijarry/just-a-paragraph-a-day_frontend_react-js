import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Books from "./Books";
import Chapters from "./Chapters";
import Paragraphs from "./Paragraphs";
import PublicRoute from "./routes/PublicRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";

const verifyTokenAPIURL = "";

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "",
      },
    };

    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyTokenAPIURL, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenticating(false);
      })
      .catch(() => {
        resetUserSession();
        setAuthenticating(false);
      });
  }, []);

  const token = getToken();
  if (isAuthenticating && token) {
    return <div className="content">Authenticating..</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/register">
            Register
          </NavLink>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
          <NavLink activeClassName="active" to="/Books">
            Books
          </NavLink>
          <NavLink activeClassName="active" to="/Chapters">
            Chapters
          </NavLink>
          <NavLink activeClassName="active" to="/Paragraphs">
            Paragraphs
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PublicRoute path="/login" component={Login}></PublicRoute>
            <PublicRoute path="/register" component={Register}></PublicRoute>
            <PrivateRoute path="/books" component={Books}></PrivateRoute>
            <PrivateRoute path="/chapters" component={Chapters}></PrivateRoute>
            <PrivateRoute
              path="/paragraphs"
              component={Paragraphs}
            ></PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
