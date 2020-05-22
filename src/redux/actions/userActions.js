import {
  SET_USER,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ,
} from "../types";

import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUser());
      dispatch({ type: STOP_LOADING_UI });
      dispatch({ type: CLEAR_ERRORS });
      setTimeout(() => {
        history.push("/");
      }, 1500);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};

export const getUser = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const readNotifications = (notificationId) => (dispatch) => {
  axios
    .post("/user/notifications", notificationId)
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((err) => console.log(err.response.data));
};

const setAuthorizationHeader = (token) => {
  const userToken = token;
  localStorage.setItem("userToken", userToken);
  axios.defaults.headers.common["Authorization"] = userToken;
};
