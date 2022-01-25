import * as actions from "./ActionTypes";

export const bugAdded = description => ({
  type: actions.BUG_ADDED,
  payload: {
   description
  }
});