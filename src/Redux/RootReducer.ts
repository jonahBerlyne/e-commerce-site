import { combineReducers } from 'redux';
import cartReducer from './Slices/cartSlice';
import userReducer from './Slices/userSlice';

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer 
});

export type RootState = ReturnType<typeof rootReducer>;