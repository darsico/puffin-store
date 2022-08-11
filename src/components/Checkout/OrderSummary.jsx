import { useCartStore, useCheckout } from '../../store';

const OrderSummary = () => {
  const { cart } = useCartStore((state) => state) || [];
  const { deliveryMethod } = useCheckout((state) => state);
  const deliveryMethodExists = Object.keys(deliveryMethod).length;

  const cartSubtotal = (cart.length > 0 && cart.reduce((acc, item) => acc + item.quantity * item.price, 0)) || 0;
  const cartTotalWithDelivery = deliveryMethodExists ? cartSubtotal + deliveryMethod.price : cartSubtotal;
  const IGVinPeru = 0.18;
  const IGV = (cartTotalWithDelivery * IGVinPeru).toFixed(2) || 0;

  return (
    <div className="grid grid-cols-1 grid-rows-2fr_1fr_1fr ">
      <div className="border-b-2 py-4">
        {cart.length > 0 &&
          cart.map(({ productId, name, price, quantity, productImage, device, color }, index) => (
            <li key={productId} className="grid grid-cols-[1fr_2fr_1fr] bg-white p-3 rounded-md h-fit" initial={{ y: '50%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '50%', opacity: 0 }} transition={{ duration: 0.6 }}>
              <figure className="w-20">
                <img src={productImage[0]} alt="" className="object-cover" />
              </figure>
              <div className="flex flex-col justify-between h-fit md:h-full px-2 gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold">
                    {name} x {quantity}
                  </p>
                  <p className="mb-auto text-sm font-medium text-gray-400">
                    {device} / {color}
                  </p>
                  {/* <p className="md:self-end md:text-xl md:font-semibold font-medium md:hidden block">S/.{(price * quantity).toFixed(2)}</p> */}
                </div>
              </div>
              <p className="self-start items-center  justify-self-end text-base font-medium  ">S/.{(price * quantity).toFixed(2)}</p>
            </li>
          ))}
      </div>
      <div className="py-4 border-b-2 flex flex-col gap-2">
        <div className="flex justify-between ">
          <p>Subtotal</p>
          <p>S/.{cartSubtotal}</p>
        </div>
        {/* <div className="flex justify-between ">
          <p>IGV</p>
          <p>S/.{IGV.toFixed(2)}</p>
        </div> */}
        <div className="flex justify-between ">
          <p>Envío</p>
          <p>{deliveryMethodExists ? `${deliveryMethod.price === 0 ? 'GRATIS' : `S/.${deliveryMethod.price}`}` : 'Calculado en el siguiente paso'}</p>
        </div>
      </div>
      <div className="flex justify-between py-4 items-center">
        <div className="flex flex-col">
          <p className="text-xl">Total</p>
          <p>Incluye los S/.{IGV} de impuestos</p>
        </div>
        <p>
          PEN <span className="text-2xl text-gray-900"> S/.{cartTotalWithDelivery.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
