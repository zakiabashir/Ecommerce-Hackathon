'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  items: any[]; // Define your item type
  totalQuantity: number;
  size: string;
  name: string;
  colors: string[];
}


interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity(state, action: PayloadAction<string>) {
        const id = action.payload;
        const existingItem = state.items.find(item => item.id === id);
  
        if (existingItem) {
          existingItem.quantity += 1;
          state.totalQuantity += 1; // Update total quantity
        }
    },
     // Decrement quantity
     decreaseQuantity(state, action: PayloadAction<string>) {
        const id = action.payload;
        const existingItem = state.items.find(item => item.id === id);
  
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalQuantity -= 1; // Update total quantity
        } else {
          // Optional: Remove item if quantity becomes zero
          state.items = state.items.filter(item => item.id !== id);
          state.totalQuantity -= 1;
        }
    },
    addToCart(state, action: PayloadAction<CartItem>) {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);
        
        if (existingItem) {
            // If the item already exists, do not increase totalQuantity
            existingItem.quantity += 1; // Just increase the quantity of the existing item
        } else {
            // If it's a new item, add it to the cart and increase totalQuantity
            state.items.push({ ...newItem, quantity: 1 });
            state.totalQuantity += 1; // Increase totalQuantity only for new items
            
        }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        existingItem.quantity = quantity;
      }
    },
  },
});
export const { addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity } = cartSlice.actions;


export default cartSlice.reducer;
