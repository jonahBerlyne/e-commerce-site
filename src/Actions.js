import * as actions from "./ActionTypes";

// export const bugAdded = description => ({
//   type: actions.BUG_ADDED,
//   payload: {
//    description
//   }
// });

export const itemAdded = id => ({
  type: actions.ITEM_ADDED,
  payload: {
    id
  }
});