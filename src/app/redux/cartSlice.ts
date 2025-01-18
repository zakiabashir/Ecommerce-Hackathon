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

const initialState: CartState = loadCartFromLocalStorage() || {
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
    
      // Ensure originalStock is initialized
      if (!state.originalStock) {
        state.originalStock = {};  // Initialize if not present
      }
    
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
    
        // Initialize the original stock if it's undefined
        if (state.originalStock[newItem._id] === undefined) {
          state.originalStock[newItem._id] = newItem.stock;
        }
      }
    }
    ,    
    increaseQuantity(state, action: PayloadAction<string>) {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      const availableStock = state.stock[_id] ?? 0;
    
      // Ensure originalStock is initialized
      if (!state.originalStock) {
        state.originalStock = {};  // Initialize if not present
      }
    
      const originalStock = state.originalStock[_id];
    
      if (originalStock === undefined) {
        console.error(`Original stock not found for product ID: ${_id}`);
        return;  // Early return to avoid further processing
      }
    
      if (existingItem && availableStock > 0) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.stock[_id] -= 1;
    
        // Double stock logic
        if (!existingItem.isStockDoubled && availableStock === Math.floor(originalStock / 2)) {
          // state.stock[_id] *= 2; // Double the remaining stock
          existingItem.isStockDoubled = true; // Mark as doubled
        }
      }
    }
    

,
    decreaseQuantity(state, action: PayloadAction<string>) {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalQuantity -= 1;
          state.stock[_id] += 1; // Restore stock when item is removed
        } else {
          state.totalQuantity -= existingItem.quantity;
          state.items = state.items.filter((item) => item._id !== _id);
          delete state.stock[_id]; // Remove stock record for item if it's removed from cart
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
  },
});

export const { addToCart, increaseQuantity , decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
