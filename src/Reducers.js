import * as actions from "./ActionTypes";

// let lastId = 0;

export default function reducer(state = [], action) {
 switch (action.type) {
  case actions.ITEM_ADDED:

   const isInCart = state.find(item => item.id === action.payload.id);

   return isInCart ? state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1, price: parseFloat((action.payload.price * (item.quantity + 1)).toFixed(2))} : item) : [...state, {...action.payload, quantity: 1}];

  case actions.ITEM_REMOVED:

    return state.filter(item => item.id !== action.payload.id);

  default:
   return state;
 }
}