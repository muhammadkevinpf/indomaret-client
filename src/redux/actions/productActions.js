import {
  SET_PRODUCTS,
  LOADING_PRODUCTS,
  SET_PRODUCT,
  UPDATE_PRODUCTS,
  SET_TABLE_PRODUCTS,
  NEXT_PRODUCT,
  PREV_PRODUCT,
} from "../types";
import axios from "axios";

// get all product
export const getProducts = () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
  axios
    .get("/products")
    .then((res) => {
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response.data));
};

//get single product
export const getProduct = (productId) => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
  axios
    .get(`/products/detail/${productId}`)
    .then((res) => {
      dispatch({
        type: SET_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response.data));
};

export const updateProduct = (productId, price) => (dispatch) => {
  axios
    .post(`/products/update/${productId}`, price)
    .then((res) => {
      dispatch({ type: UPDATE_PRODUCTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const getChangedPrice = () => (dispatch) => {
  axios
    .get("/products/changed")
    .then((res) => {
      dispatch({
        type: SET_TABLE_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const nextProduct = () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
  axios
    .get("/products/next")
    .then((res) => {
      dispatch({ type: NEXT_PRODUCT, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const prevProduct = () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
  axios
    .get("/products/prev")
    .then((res) => {
      dispatch({ type: PREV_PRODUCT, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
