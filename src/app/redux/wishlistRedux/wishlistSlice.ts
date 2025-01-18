import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: string;
  productName: string;
  price: number;
  productImage: string;
  size: string;
  colors: string[];
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      const item = action.payload;
      // Check if the item is already in the wishlist
      const existingItem = state.items.find((product) => product.id === item.id);
      if (!existingItem) {
        state.items.push(item); // Add the product to the wishlist
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload); // Remove item by ID
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
