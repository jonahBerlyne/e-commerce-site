import * as actions from "./ActionTypes";

// export const bugAdded = description => ({
//   type: actions.BUG_ADDED,
//   payload: {
//    description
//   }
// });

// let items = 0;

export const itemAdded = (id, title, image, price) => ({
  type: actions.ITEM_ADDED,
  payload: {
    id,
    title,
    image,
    price
  }
});

export const itemRemoved = id => ({
  type: actions.ITEM_REMOVED,
  payload: {
    id
  }
});