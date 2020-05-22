import {
  SET_PRODUCTS,
  LOADING_PRODUCTS,
  SET_PRODUCT,
  UPDATE_PRODUCTS,
  SET_TABLE_PRODUCTS,
  PREV_PRODUCT,
  NEXT_PRODUCT,
} from "../types";

const initialState = {
  products: [],
  product: {},
  loading: false,
  table: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case SET_TABLE_PRODUCTS:
      return {
        ...state,
        table: action.payload,
      };
    case UPDATE_PRODUCTS:
      state.product.price = action.payload.price;
      return {
        ...state,
      };
    case PREV_PRODUCT:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case NEXT_PRODUCT:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
