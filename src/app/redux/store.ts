
// redux/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from './localStorage';

// Combine all reducers (you can add more in the future)
const rootReducer = combineReducers({
  cart: cartReducer, // cartSlice reducer
});

// Load the cart state from localStorage if available
const preloadedState = {
  cart: loadCartFromLocalStorage() || { items: [], totalQuantity: 0 },
};

// Create the Redux store with preloaded state
const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Load cart state from localStorage
});

// Listen for store updates and save to localStorage
store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart); // Save only the cart state
});

// Type for RootState
export type RootState = ReturnType<typeof store.getState>;

// Type for Dispatch
export type AppDispatch = typeof store.dispatch;

export default store;
