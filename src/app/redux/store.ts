// redux/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer, // cartSlice reducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; // Ensures type safety for state

export default store;
