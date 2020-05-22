import {
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";

const initialState = {
  loading: false,
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
}
