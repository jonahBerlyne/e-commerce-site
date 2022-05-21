import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface CartState {
  cartIsOpen: boolean;
}

const initialState: CartState = {
  cartIsOpen: false
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.cartIsOpen = true;
    },
    closeCart: (state) => {
      state.cartIsOpen = false;
    }
  }
});

export const { openCart, closeCart } = cartSlice.actions;

export const selectCartIsOpen = (state: RootState) => state.cart.cartIsOpen;

export default cartSlice.reducer;