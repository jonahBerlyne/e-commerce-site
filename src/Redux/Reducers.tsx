import * as actions from "./ActionTypes";

export default function reducer(state = [], action) {
 const isInCart = state.find(item => item.id === action.payload.id);

 switch (action.type) {
  case actions.ITEM_ADDED:

   return isInCart ? state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1, price: parseFloat((action.payload.price * (item.quantity + 1)).toFixed(2))} : item) : [...state, {...action.payload, quantity: 1}];
   
  case actions.ITEM_DECREASED:
     
   return state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity - 1, price: parseFloat((action.payload.price - (action.payload.price * (1 / item.quantity))).toFixed(2))} : item);

  case actions.ITEM_INCREASED:
   
   return state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1, price: parseFloat((action.payload.price + (action.payload.price * (1 / item.quantity))).toFixed(2))} : item);
     
  case actions.ITEM_REMOVED:

   return state.filter(item => item.id !== action.payload.id);

  case actions.ITEM_SET:

   return isInCart ? state.map(item => item) : [...state, action.payload];

  default:
   return state;
 }
}