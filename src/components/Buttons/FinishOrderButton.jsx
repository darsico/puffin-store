import { nanoid } from 'nanoid';
import useCheckout from '../../hooks/useCheckout';
import { useCartStore, useCheckoutStore } from '../../store';
import TinyLoader from '../Loaders/TinyLoader';

const FinishOrderButton = ({ typeOfPayment }) => {
  // typeOfPayment : typeOfPayment.id

  const { cart, getSubtotal } = useCartStore((state) => state) || [];
  const { deliveryMethod, payer } = useCheckoutStore((state) => state);

  const cartSubtotal = getSubtotal();
  const { price: deliveryPrice, name: deliveryName } = deliveryMethod || {};
  const cartTotal = cartSubtotal + deliveryPrice;
  const IGVinPeru = 0.18;

  const IGV = (cartTotal * IGVinPeru).toFixed(2) || 0;

  const data = {
    payerEmail: payer.email,
    payer,
    order: {
      orderId: nanoid(),
      products: cart,
      orderSubtotal: cartSubtotal,
      deliveryPrice,
      deliveryName,
      igv: IGV,
      orderTotal: cartTotal,
    },
    payment: {
      id: typeOfPayment.id,
      name: typeOfPayment.name,
    },
  };

  const { mpCheckout, isLoading } = useCheckout(data);

  const handleFinishOrder = async () => {
    await mpCheckout();
  };
  return (
    <button className="p-3 text-white bg-black mt-4 w-full flex justify-center items-center gap-5 transition-all" onClick={handleFinishOrder}>
      Finalizar Pedido {isLoading && <TinyLoader />}
    </button>
  );
};

export default FinishOrderButton;
