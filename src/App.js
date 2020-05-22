import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import ProtectedRoute from "./util/privateRoute";
// MUI
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// util
import themeUI from "./util/theme-ui";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";

//redux
import { logoutUser, getUser } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme(themeUI);

axios.defaults.baseURL =
  "https://us-central1-indomaret-dashboard.cloudfunctions.net/api";

const token = localStorage.userToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUser());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <ProtectedRoute exact path="/login">
              <Login />
            </ProtectedRoute>
            <ProtectedRoute path="/" component={Home} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
