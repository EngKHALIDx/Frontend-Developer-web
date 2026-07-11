/**
 * Zustand store for client-side state management.
 * Manages global UI state: theme, navigation, cart, notifications.
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface AppState {
  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // UI Preferences
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Navigation
      activeSection: 'home',
      setActiveSection: (section) => set({ activeSection: section }),

      // Cart
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((c) => c.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),
      updateQuantity: (id, qty) =>
        set((state) => ({
          cart: state.cart.map((c) =>
            c.id === id ? { ...c, quantity: Math.max(0, qty) } : c
          ),
        })),
      clearCart: () => set({ cart: [] }),
      cartTotal: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

      // UI
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Search
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: 'monoverse-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
