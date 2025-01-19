import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveCartToLocalStorage, loadCartFromLocalStorage, saveWishlistToLocalStorage, loadWishlistFromLocalStorage } from './localStorage';

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
  wishlist: CartItem[]; // New state for wishlist
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  stock: {},
  originalStock: {},
  wishlist: [], // Initialize wishlist
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
    
      // Initialize stock if not already present
      if (state.stock[newItem._id] === undefined) {
        state.stock[newItem._id] = newItem.stock;
      }
    
      const existingItem = state.items.find((item) => item._id === newItem._id);
    
      if (existingItem) {
        if (state.stock[newItem._id] > 0) {
          existingItem.quantity += 1;
          state.totalQuantity += 1;
          state.stock[newItem._id] -= 1;
        } else {
          console.log('Out of stock for:', newItem._id);
        }
      } else if (state.stock[newItem._id] > 0) {
        state.items.push({ ...newItem, quantity: 1 });
        state.totalQuantity += 1;
        state.stock[newItem._id] -= 1;
      } else {
        console.log('Out of stock for:', newItem._id);
      }
    },

    // Wishlist functionality
    addToWishlist(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.wishlist.find((item) => item._id === newItem._id);

      if (!existingItem) {
        state.wishlist.push(newItem);
      }
      saveWishlistToLocalStorage(state.wishlist); // Save to localStorage
    },

    removeFromWishlist(state, action: PayloadAction<string>) {
      const _id = action.payload;
      state.wishlist = state.wishlist.filter(item => item._id !== _id);
      saveWishlistToLocalStorage(state.wishlist); // Save to localStorage
    },

    clearWishlist(state) {
      state.wishlist = [];
      saveWishlistToLocalStorage(state.wishlist); // Save to localStorage
    },

    // Set cart and wishlist from localStorage (only on the client-side)
    setCartFromLocalStorage(state) {
      const cartData = loadCartFromLocalStorage();
      if (cartData) {
        state.items = cartData.items;
        state.totalQuantity = cartData.totalQuantity;
        state.stock = cartData.stock;
        state.originalStock = cartData.originalStock;
      }
    },

    setWishlistFromLocalStorage(state) {
      const wishlistData = loadWishlistFromLocalStorage();
      if (wishlistData) {
        state.wishlist = wishlistData;
      }
    },

    // Cart modification actions...
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
  },
});

// Middleware for persistence
const persistMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = store.getState();
  saveCartToLocalStorage(state.cart);
  saveWishlistToLocalStorage(state.cart.wishlist); // Save wishlist on action dispatch
  return result;
};

// Apply middleware during store creation
export const { 
  addToCart, 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart, 
  clearCart, 
  setCartFromLocalStorage, 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist, 
  setWishlistFromLocalStorage 
} = cartSlice.actions;

export default cartSlice.reducer;
