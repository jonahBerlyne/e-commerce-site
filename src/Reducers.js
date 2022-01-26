import * as actions from "./ActionTypes";

// let lastId = 0;

export default function reducer(state = [], action) {
 switch (action.type) {
  case actions.ITEM_ADDED:
   //
  // case actions.BUG_ADDED:
  //  return [
  //   ...state,
  //   {
  //    id: ++lastId,
  //    description: action.payload.description,
  //    resolved: false
  //   }
  //  ];
  default:
   return state;
 }
}