import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MenuItem } from "../api/menuApi";

interface Order {
  orderId: string;
  customerEmail: string;
  createdAt: number;
  isConfirmed: string;
  items: MenuItem[];
  totalPrice: number;
}

interface CurrentOrderStore {
  order: Order | null; // Store the entire order object
  increaseQuantity: (item: MenuItem) => void;
  removeFromOrder: (menuId: string) => void;
  decreaseQuantity: (menuId: string) => void;
  clearOrder: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setOrder: (order: Order) => void; // Set the full order data
  resetOrder: () => void; // Optionally reset the order state
}

export const useCurrentOrderStore = create<CurrentOrderStore>()(
  persist(
    (set, get) => ({
      order: null, // Start with an empty order

      // Increase item quantity
      increaseQuantity: (item) =>
        set((state) => {
          if (state.order) {
            return {
              order: {
                ...state.order,
                items: [...state.order.items, item], // Add the item to the array
              },
            };
          }
          return state; // Return unchanged state if no order exists
        }),

      // Remove item from the order
      removeFromOrder: (menuId) =>
        set((state) => {
          if (state.order) {
            return {
              order: {
                ...state.order,
                items: state.order.items.filter(
                  (item) => item.menuId !== menuId
                ),
              },
            };
          }
          return state;
        }),

      // Decrease item quantity
      decreaseQuantity: (menuId) =>
        set((state) => {
          if (state.order) {
            const updatedItems = [...state.order.items];
            const indexToRemove = updatedItems.findIndex(
              (item) => item.menuId === menuId
            );

            if (indexToRemove !== -1) {
              updatedItems.splice(indexToRemove, 1);
            }

            return { order: { ...state.order, items: updatedItems } };
          }
          return state;
        }),

      // Clear the order
      clearOrder: () => set({ order: null }),

      // Get the total number of items in the order
      getTotalItems: () => {
        const order = get().order;
        return order ? order.items.length : 0; // Safely check if order exists
      },

      // Get the total price of the order
      getTotalPrice: () => {
        const order = get().order;
        return order
          ? order.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )
          : 0; // Safely check if order exists
      },

      // Set the full order data
      setOrder: (order: Order) => set({ order }),

      // Reset the order state if needed (for example, after successful checkout)
      resetOrder: () => set({ order: null }),
    }),
    {
      name: "current-order", // Persistent key for the order
      storage: createJSONStorage(() => localStorage), // Use localStorage to persist the current order
    }
  )
);

/**
 * Författare: Isak
 *
 * Zustand store för en skickad order som går att redigera innan staff har godkänt ordern.
 * Nu med fullständig orderinformation (orderId, customerEmail, etc.).
 */
