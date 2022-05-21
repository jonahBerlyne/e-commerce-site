import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from './Slices/cartSlice';
import userReducer from './Slices/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;