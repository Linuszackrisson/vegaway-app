import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MenuItem } from '../api/menuApi';

interface CartStore {
  items: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (menuId: string) => void;
  decreaseQuantity: (menuId: string) => void;
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
      
      decreaseQuantity: (menuId) => set((state) => {
        const updatedItems = [...state.items];
        const indexToRemove = updatedItems.findIndex(item => item.menuId === menuId);
        
        if (indexToRemove !== -1) {
          updatedItems.splice(indexToRemove, 1);
        }
        
        return { items: updatedItems };
      }),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.length;
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Författare Linus
 * CartStore, hanterar varukorgen och dess funktioner.
 * Funktion för att lägga till, ta bort och ändra antal produkter i varukorgen.
 * Funktioner för att räkna totala antal och totala priset i varukorgen.
 * 
 */