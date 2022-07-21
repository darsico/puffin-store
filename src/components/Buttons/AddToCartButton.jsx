import { Suspense, useState } from 'react';
import { useCartStore, useStore } from '../../store.js';
import TinyLoader from '../Loaders/TinyLoader.jsx';

const AddToCartButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { variantOption, productItem, setIsOpenCart } = useStore((state) => state);
  const { setCart } = useCartStore((state) => state);
  const { price, salePrice, id } = variantOption;
  const { name, deviceModel } = productItem;
  const deviceName = deviceModel && deviceModel[0].name;
  const productImage = variantOption && variantOption.productImages;
  const productToOrder = {
    productImage,
    productId: id,
    name,
    device: deviceName,
    price: salePrice || price,
    quantity: 1,
    color: variantOption.name,
  };
  const addToCart = () => {
    setCart(productToOrder);
    setIsOpenCart(true);
  };

  return (
    <button
      onClick={addToCart}
      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-gray-900 transition-colors  border border-solid  border-gray-700  rounded-md hover:bg-gray-700 hover:text-white hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-opacity-50 focus:shadow-outline-gray-500"
    >
      {isLoading && <TinyLoader />}
      Agregar al Carrito
    </button>
  );
};

export default AddToCartButton;
