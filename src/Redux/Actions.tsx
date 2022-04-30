import * as actions from "./ActionTypes";

export const itemAdded = (id: number, title: string, image: string, price: number) => ({
  type: actions.ITEM_ADDED,
  payload: {
    id,
    title,
    image,
    price
  }
});

export const itemDecreased = (id: number, price: number) => ({
  type: actions.ITEM_DECREASED,
  payload: {
    id,
    price 
  }
});

export const itemIncreased = (id: number, price: number) => ({
  type: actions.ITEM_INCREASED,
  payload: {
    id,
    price 
  }
});

export const itemRemoved = (id: number) => ({
  type: actions.ITEM_REMOVED,
  payload: {
    id
  }
});

export const itemSet = (id: number, title: string, image: string, price: number, quantity: number) => ({
  type: actions.ITEM_SET,
  payload: {
    id,
    title,
    image,
    price,
    quantity
  }
});