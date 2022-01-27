import * as actions from "./ActionTypes";

// export const bugAdded = description => ({
//   type: actions.BUG_ADDED,
//   payload: {
//    description
//   }
// });

// let items = 0;

export const itemAdded = (title, image, price) => ({
  type: actions.ITEM_ADDED,
  payload: {
    title,
    image,
    price
  }
});