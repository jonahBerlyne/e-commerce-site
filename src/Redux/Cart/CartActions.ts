import * as actions from "./CartTypes";

export const addItemToCart = (id: number, title: string, image: string, price: number) => ({
  type: actions.ADD_ITEM_TO_CART,
  payload: {
    id,
    title,
    image,
    price
  }
});

export const decreaseItemInCart = (id: number, price: number) => ({
  type: actions.DECREASE_ITEM_IN_CART,
  payload: {
    id,
    price 
  }
});

export const increaseItemInCart = (id: number, price: number) => ({
  type: actions.INCREASE_ITEM_IN_CART,
  payload: {
    id,
    price 
  }
});

export const removeItemFromCart = (id: number) => ({
  type: actions.REMOVE_ITEM_IN_CART,
  payload: {
    id
  }
});

export const setItemToCart = (id: number, title: string, image: string, price: number, quantity: number) => ({
  type: actions.SET_ITEM_TO_CART,
  payload: {
    id,
    title,
    image,
    price,
    quantity
  }
});