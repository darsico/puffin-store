import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create(
  devtools((set) => ({
    productItem: {},
    setProductItem: (data) => set({ productItem: data }),
    variantOption: {},
    setInitialVariantOption: (data) => set({ variantOption: data }),
    setVariantOption: (id) => set((state) => ({ ...state, variantOption: state.productItem.variants.filter((element) => element.id === id)[0] })),
    openCart: false,
    setOpenCart: (data) => set({ openCart: data }),
  }))
);

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      setCart: (data) =>
        set((state) => {
          const doesProductExist = state.cart.filter((item) => item.productId === data.productId);
          return doesProductExist.length > 0
            ? {
                ...state,
                cart: state.cart.map((item) => (item.productId === data.productId ? { ...item, quantity: item.quantity + 1 } : item)),
              }
            : { ...state, cart: [...state.cart, data] };
        }),
      removeCart: (id) => set((state) => ({ cart: state.cart.filter((element) => element.id !== id) })),
      clearCart: () => set(() => ({ cart: [] })),
      totalCart: get((state) => state.cart.reduce((acc, curr) => acc + curr.price, 0)),
    }),
    { name: 'cart' }
  )
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('store', useStore);
  mountStoreDevtool('cart', useCartStore);
}
