import * as actions from "./ActionTypes";

export const itemAdded = (id, title, image, price) => ({
  type: actions.ITEM_ADDED,
  payload: {
    id,
    title,
    image,
    price
  }
});

export const itemDecreased = (id, price) => ({
  type: actions.ITEM_DECREASED,
  payload: {
    id,
    price 
  }
});

export const itemIncreased = (id, price) => ({
  type: actions.ITEM_INCREASED,
  payload: {
    id,
    price 
  }
});

export const itemRemoved = id => ({
  type: actions.ITEM_REMOVED,
  payload: {
    id
  }
});