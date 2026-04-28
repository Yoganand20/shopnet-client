import { create } from "zustand";
import type { CartItem, Category, WishlistItem, Address } from "../lib/types";
import { fetchCart, fetchAddresses } from "../services/shopService";

interface ShopState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  categories: Category[];
  addresses: Address[];
  setCart: (cart: CartItem[]) => void;
  setWishlist: (wishlist: WishlistItem[]) => void;
  setCategories: (categories: Category[]) => void;
  setAddresses: (addresses: Address[]) => void;
  fetchCart: () => Promise<void>;
  fetchAddresses: () => Promise<void>;
}

export const useShopStore = create<ShopState>()((set) => ({
  cart: [],
  wishlist: [],
  categories: [],
  addresses: [],
  setCart: (cart) => set(() => ({ cart })),
  setWishlist: (wishlist) => set(() => ({ wishlist })),
  setCategories: (categories) => set(() => ({ categories })),
  setAddresses: (addresses) => set(() => ({ addresses })),
  fetchCart: async () => {
    try {
      const cart = await fetchCart();
      set({ cart });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  },
  fetchAddresses: async () => {
    try {
      const addresses = await fetchAddresses();
      set({ addresses });
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  },
}));
