import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MenuItem } from '../api/menuApi';

interface CartStore {
  items: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (menuId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
      
      removeFromCart: (menuId) => set((state) => ({
        items: state.items.filter(item => item.menuId !== menuId)
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.length;
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      }
    }),
    {
      name: 'cart-storage', // unikt namn för localStorage nyckeln
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Författare Linus
 * Basic cartStore, kan behöva modifieras längre fram.
 * Lade till localstorage så det sparas vid omladdning av sidan. Annars bevaras bara kundvagnen när man navigerar via routes.
 */