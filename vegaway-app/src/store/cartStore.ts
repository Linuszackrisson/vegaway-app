import { create } from 'zustand';
import { MenuItem } from '../api/menuApi';

interface CartStore {
  items: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (menuId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  removeFromCart: (menuId) => set((state) => ({
    items: state.items.filter(item => item.menuId !== menuId)
  })),
  clearCart: () => set({ items: [] })
}));

/**
 * Författare Linus
 * Basic cartStore, kan behöva modifieras längre fram.
 */