import { Disclosure, Tab } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext.jsx';
import CheckoutLayout from '../src/components/layout/CheckoutLayout.jsx';
import Container from '../src/components/UI/Container.jsx';
import { useCartStore, useCheckoutStore } from '../src/store.js';
import { FiShoppingCart } from 'react-icons/fi';
import { useEffect } from 'react';
import CheckoutFlow from '../src/components/Checkout/CheckoutFlow.jsx';
import OrderSummary from '../src/components/Checkout/OrderSummary.jsx';
import { useRouter } from 'next/router';
import emptyCart from '../src/assets/checkoutIcons/empty_cart.svg';
import Image from 'next/image.js';

const Checkout = () => {
  const { user, signUp, isLoading } = useAuth();

  const { cart, getSubtotal } = useCartStore((state) => state) || [];
  const { deliveryMethod } = useCheckoutStore((state) => state) || {};
  const cartTotal = getSubtotal();
  const deliveryMethodExists = Object.keys(deliveryMethod).length;
  const cartTotalWithDelivery = deliveryMethodExists ? cartTotal + deliveryMethod.price : cartTotal;
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/devices/iphone-11', undefined, { shallow: true });
    }
  }, []);

  useEffect(() => {
    window.localStorage.removeItem('payer');
  }, [router]);

  return (
    <CheckoutLayout>
      <section className="mx-auto md:max-w-screen-lg w-[90%]   mt-[100px]  grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 pb-10">
        {/* {cart.length > 0 ? ( */}
        {/* <> */}
        <section className=" md:mt-[200px]   md:hidden ">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className={`flex w-full gap-2 rounded-lg px-4 py-4 text-left font-base focus:outline-none focus-visible:ring items-center focus-visible:ring-gray-500 focus-visible:ring-opacity-75 text-sm md:text-lg ${open ? 'border-x border-t ' : 'border'} shadow-sm leading-6`}>
                  <FiShoppingCart />
                  <span> {open ? 'Esconder' : 'Mostrar'} resumen del pedido</span>
                  <BsChevronDown className={`${open ? 'rotate-180 transform' : ''} h-4 w-4  transition-all`} />
                  <span className="ml-auto text-lg md:text-2xl">S/. {cartTotalWithDelivery.toFixed(2)}</span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 text-gray-500 border-b border-x">
                  <OrderSummary />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </section>
        {/* <section> */}
        {/* <div>
              <h1>Express Checkout</h1>
              <div>
                <p>En un apuro? Usa una de nuestras opciones express de pago</p>
                <div className="flex flex-col gap-2">
                  <button>Paypal</button>
                  <button>Mercado Pago</button>
                </div>
              </div>
            </div> */}
        {/* </section> */}
        <CheckoutFlow />
        <div>
          <OrderSummary />
        </div>
        {/* </> */}
        {/* ) : (
           <section>
             <div className="h-28 hover:cursor-pointer opacity-70">
               <figure style={{ width: '100%', height: '100%', position: 'relative' }}>
                 <Image src={emptyCart.src} alt={`Foto de producto`} className="object-cover object-center w-full h-full rounded-lg " layout="fill" objectFit="contain" priority />
               </figure>
             </div>
             <p>Parece que no tienes ningun producto en tu Carrito.</p>
             <h2>Agrega un producto</h2>
             <button>Ir a comprar</button>
           </section>
         )} */}
      </section>
    </CheckoutLayout>
  );
};

export default Checkout;
