import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from './localStorage';

interface CartItem {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  productImage: string;
  size: string;
  colors: string[];
  stock: number;
  isStockDoubled?: boolean;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  stock: Record<string, number>;
  originalStock: Record<string, number>;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  stock: {},
  originalStock: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (state.stock[newItem._id] === undefined) {
        state.stock[newItem._id] = newItem.stock - 1; // Initialize stock for new item
      } else {
        state.stock[newItem._id] -= 1; // Decrease stock for existing item
      }
      console.log('Adding to cart:', newItem);
      console.log('Stock before adding:', state.stock);
      console.log('Stock before adding:', JSON.parse(JSON.stringify(state.stock)));
                  
      if (existingItem) {
        if (state.stock[newItem._id] > 0) {
          existingItem.quantity += 1;
          state.totalQuantity += 1;
          state.stock[newItem._id] -= 1;
        }
      } else if (newItem.stock > 0) {
        state.items.push({ ...newItem, quantity: 1 });
        state.totalQuantity += 1;
        state.stock[newItem._id] = newItem.stock - 1;

        if (state.originalStock[newItem._id] === undefined) {
          state.originalStock[newItem._id] = newItem.stock;
        }
      }
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      const availableStock = state.stock[_id] ?? 0;
      const originalStock = state.originalStock[_id];

      if (existingItem && availableStock > 0) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.stock[_id] -= 1;

        if (!existingItem.isStockDoubled && availableStock === Math.floor(originalStock / 2)) {
          existingItem.isStockDoubled = true;
        }
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalQuantity -= 1;
          state.stock[_id] += 1;
        } else {
          state.totalQuantity -= existingItem.quantity;
          state.items = state.items.filter((item) => item._id !== _id);
          delete state.stock[_id];
        }
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item._id !== id);
        delete state.stock[id];
        delete state.originalStock[id];
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.stock = {};
      state.originalStock = {};
    },

    // Set cart from localStorage (only on the client-side)
    setCartFromLocalStorage(state) {
      const cartData = loadCartFromLocalStorage();
      if (cartData) {
        state.items = cartData.items;
        state.totalQuantity = cartData.totalQuantity;
        state.stock = cartData.stock;
        state.originalStock = cartData.originalStock;
      }
    },
  },
});

export const { 
  addToCart, 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart, 
  clearCart, 
  setCartFromLocalStorage 
} = cartSlice.actions;

export default cartSlice.reducer;
