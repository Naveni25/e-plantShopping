import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
     const existing = state.items.find(
        item => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      state.totalQuantity -= item.quantity;
      state.items = state.items.filter(i => i.id !== action.payload);
    updateQuantity: (state, action) => {

    
    },
  },
  }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
