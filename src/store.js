import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create(
  devtools((set) => ({
    productItemsByDevice: [],
    setProductItemsByDevice: (item) => set((state) => ({ ...state, productItemsByDevice: item })),

    changeInitialVariant: (variantId, designId) =>
      set((state) => {
        const itemSelected = state.productItemsByDevice.find((item) => item.id === designId).variants.find((item) => item.id === variantId);
        return {
          ...state,
          productItemsByDevice: state.productItemsByDevice.map((item) => {
            if (item.id === designId) {
              return { ...item, initialVariant: itemSelected };
            }
            return item;
          }),
        };
      }),
    productItem: {},
    setProductItem: (data) => set({ productItem: data }),

    variantOption: {},
    setInitialVariantOption: (data) => set({ variantOption: data }),
    setVariantOption: (id) => set((state) => ({ ...state, variantOption: state.productItem.variants.filter((element) => element.id === id)[0] })),

    isOpenCart: false,
    setIsOpenCart: (data) => set({ isOpenCart: data }),
  }))
);

const dummyStorageApi = {
  getItem: () => null,
  setItem: () => undefined,
};

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

      removeCart: (id) => set((state) => ({ ...state, cart: state.cart.filter((element) => element.productId !== id) })),
      clearCart: () => set(() => ({ cart: [] })),

      decreaseOne: (id) =>
        set((state) => {
          let itemToDelete = state.cart.find((item) => item.productId === id); // get the item to delete
          return itemToDelete.quantity > 1
            ? {
                ...state,
                cart: state.cart.map((item) => (item.productId === id ? { ...item, quantity: item.quantity - 1 } : item)),
              }
            : { ...state, cart: state.cart.filter((item) => item.productId !== id) };
        }),
      increaseOne: (id) =>
        set((state) => {
          return {
            ...state,
            cart: state.cart.map((item) => (item.productId === id ? { ...item, quantity: item.quantity + 1 } : item)),
          };
        }),
    }),
    { name: 'cart', storage: typeof window !== 'undefined' ? window.localStorage : dummyStorageApi }
  )
);

export const useCheckout = create((set) => ({
  deliveryMethod: {},
  setDeliveryMethod: (data) => set((state) => ({ ...state, deliveryMethod: data })),
  clearDeliveryMethod: () => set((state) => ({ ...state, deliveryMethod: {} })),
  payer: {},
  setPayer: (data) => set((state) => ({ ...state, payer: data })),
  clearPayer: () => set((state) => ({ ...state, payer: {} })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('store', useStore);
  mountStoreDevtool('cart', useCartStore);
  mountStoreDevtool('checkout', useCheckout);
}
