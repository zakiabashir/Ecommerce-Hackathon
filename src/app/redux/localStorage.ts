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
export const saveCartToLocalStorage = (state: any) => {
  if (typeof window !== "undefined") {
    try {
      const updatedItems = state.items.map((item: any) => ({
        ...item,
        stock: item.stock - item.quantity, // Update stock in localStorage
      }));

      const updatedState = {
        ...state,
        items: updatedItems,
      };

      const serializedState = JSON.stringify(updatedState);
      localStorage.setItem('cartState', serializedState);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
};

// Load cart from localStorage
export const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = localStorage.getItem('cartState');
      if (!serializedState) {
        return undefined; // If no cart in localStorage, return undefined
      }

      const state = JSON.parse(serializedState);

      // Recalculate totalQuantity from loaded data
      const totalQuantity = state.items.reduce((total: number, item: any) => total + item.quantity, 0);

      return {
        ...state,
        totalQuantity,
      };
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return undefined;
    }
  }
};
