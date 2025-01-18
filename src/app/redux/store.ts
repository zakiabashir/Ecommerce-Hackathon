import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistRedux/wishlistSlice';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from './localStorage';
import { saveWishlistToLocalStorage, loadWishlistFromLocalStorage } from './localStorage';

// Load the cart and wishlist states from localStorage if available
const savedWishlist = loadWishlistFromLocalStorage();
const savedCart = loadCartFromLocalStorage();

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer, // cartSlice reducer
  wishlist: wishlistReducer, // wishlistSlice reducer
});

// Load the cart and wishlist state from localStorage if available
const preloadedState = {
  cart: savedCart || { items: [], totalQuantity: 0 }, // If no cart in localStorage, use default state
  wishlist: savedWishlist || { items: [] }, // If no wishlist in localStorage, use default state
};

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Load the cart and wishlist states from localStorage
});

// Save the cart and wishlist states to localStorage whenever the store changes
store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart); // Save the cart state to localStorage
  saveWishlistToLocalStorage(store.getState().wishlist); // Save the wishlist state to localStorage
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
