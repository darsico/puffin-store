import { useState } from 'react';
import { useStore } from '../../store';
import TinyLoader from '../Loaders/TinyLoader';

const CheckoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { variantOption, productItem } = useStore((state) => state);
  const { price, salePrice } = variantOption;
  const { name, deviceModel } = productItem;

  const addToCart = () => {
    console.log('added');
  };

  return (
    <button onClick={addToCart} className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white transition-colors bg-gray-900 border  border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
      {isLoading && <TinyLoader />}
      Pagar ahora S/.{salePrice || price}
    </button>
  );
};

export default CheckoutButton;
