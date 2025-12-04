import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  stock: number; // Para limitar a quantidade ao estoque disponível
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  // Getters (Computados)
  getTotal: () => number;
  getCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find(
          (i) => i.productId === newItem.productId
        );

        if (existingItem) {
          // Se já existe, soma a quantidade (travando no estoque máximo)
          const newQty = Math.min(
            existingItem.quantity + newItem.quantity,
            existingItem.stock
          );

          set({
            items: items.map((i) =>
              i.productId === newItem.productId ? { ...i, quantity: newQty } : i
            ),
          });
        } else {
          // Se não existe, adiciona na lista
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.productId !== id) });
      },

      updateQuantity: (id, qty) => {
        const items = get().items;
        const item = items.find((i) => i.productId === id);
        if (!item) return;

        // Garante que seja pelo menos 1 e não ultrapasse o estoque
        const validQty = Math.max(1, Math.min(qty, item.stock));

        set({
          items: items.map((i) =>
            i.productId === id ? { ...i, quantity: validQty } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "jcinc-cart-storage", // Nome da chave no localStorage
    }
  )
);
