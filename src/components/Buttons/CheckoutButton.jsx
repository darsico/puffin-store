import { useStore } from '../../store';
import TinyLoader from '../Loaders/TinyLoader';
import useCheckout from '../../hooks/useCheckout';

const CheckoutButton = () => {
  const { variantOption, productItem } = useStore((state) => state);
  const { price, salePrice, id } = variantOption;
  const { name, deviceModel } = productItem;

  const productToOrder = [
    {
      productId: id,
      name,
      device: deviceModel.name,
      price: salePrice || price,
      quantity: 1,
      color: variantOption.name,
    },
  ];
  const { mpCheckout, isLoading } = useCheckout(productToOrder);

  const checkoutProduct = async () => {
    try {
      await mpCheckout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={checkoutProduct} className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white transition-colors bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
      {isLoading && <TinyLoader />}
      Pagar ahora S/.{salePrice || price}
    </button>
  );
};

export default CheckoutButton;
