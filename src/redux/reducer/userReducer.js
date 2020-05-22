import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  SET_NOTIFICATIONS,
  MARK_NOTIFICATIONS_READ,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        ...action.payload,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notif) => (notif.read = true));
      return {
        ...state,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
