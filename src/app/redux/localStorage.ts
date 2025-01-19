// Save wishlist to localStorage
// Save wishlist to localStorage
export const saveWishlistToLocalStorage = (wishlist: any) => {
  if (typeof window !== "undefined") {
    try {
      const serializedWishlist = JSON.stringify(wishlist);
      localStorage.setItem('wishlist', serializedWishlist);
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }
};

// Load wishlist from localStorage
export const loadWishlistFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const serializedWishlist = localStorage.getItem('wishlist');
      return serializedWishlist ? JSON.parse(serializedWishlist) : undefined;
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return undefined;
    }
  }
};

// Save cart to localStorage
// Save cart to localStorage

// Save cart state to localStorage
export const saveCartToLocalStorage = (state: any) => {
  if (typeof window !== "undefined") {
    try {
      // Map over the items to update stock and store them
      const updatedItems = state.items.map((item: any) => ({
        ...item,
        stock: item.stock - item.quantity, // Update stock in localStorage
      }));

      // Create a new state object with updated items
      const updatedState = {
        ...state,
        items: updatedItems,
      };

      // Serialize the updated state
      const serializedState = JSON.stringify(updatedState);
      localStorage.setItem('cartState', serializedState);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
};

// Load cart state from localStorage
export const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      // Get the serialized cart state from localStorage
      const serializedState = localStorage.getItem('cartState');
      if (!serializedState) {
        return undefined; // If no cart is found in localStorage, return undefined
      }

      // Parse the serialized state
      const state = JSON.parse(serializedState);

      // Recalculate the total quantity from the loaded items
      const totalQuantity = state.items.reduce((total: number, item: any) => total + item.quantity, 0);

      // Return the state with the recalculated totalQuantity
      return {
        ...state,
        totalQuantity,
      };
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return undefined; // Return undefined if an error occurs
    }
  }
};
