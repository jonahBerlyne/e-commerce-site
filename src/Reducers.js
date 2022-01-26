import * as actions from "./ActionTypes";

// let lastId = 0;

export default function reducer(state = [], action) {
 switch (action.type) {
  case actions.ITEM_ADDED:
   return [
     ...state,
     {
       title: action.payload.title,
       price: action.payload.price
     }
   ];
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