import * as actions from "../Cart/CartTypes";
import { RootState } from "../RootReducer";

const initialState: any[] = [];

export default function cartReducer(state = initialState, action: any) {

 const isInCart = state.find(item => item.id === action.payload.id);

 switch (action.type) {
  case actions.ADD_ITEM_TO_CART:
   return isInCart ? state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1, price: parseFloat((action.payload.price * (item.quantity + 1)).toFixed(2))} : item) : [...state, {...action.payload, quantity: 1}];
   
  case actions.DECREASE_ITEM_IN_CART:
   return state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity - 1, price: parseFloat((action.payload.price - (action.payload.price * (1 / item.quantity))).toFixed(2))} : item);

  case actions.INCREASE_ITEM_IN_CART:
   return state.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1, price: parseFloat((action.payload.price + (action.payload.price * (1 / item.quantity))).toFixed(2))} : item);
     
  case actions.REMOVE_ITEM_IN_CART:
   return state.filter(item => item.id !== action.payload.id);

  case actions.SET_ITEM_TO_CART:
   return isInCart ? state.map(item => item) : [...state, action.payload];

  default:
   return state;
 }
}

export const selectCart = ((state: RootState) => state.cart);