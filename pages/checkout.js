import { Disclosure, Tab } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext.jsx';
import CheckoutLayout from '../src/components/layout/CheckoutLayout.jsx';
import Container from '../src/components/UI/Container.jsx';
import { useCartStore, useCheckout } from '../src/store.js';
import { FiShoppingCart } from 'react-icons/fi';
import { useEffect } from 'react';
import CheckoutFlow from '../src/components/Checkout/CheckoutFlow.jsx';
import OrderSummary from '../src/components/Checkout/OrderSummary.jsx';
import { useRouter } from 'next/router';
const Checkout = () => {
  const { user, signUp, isLoading } = useAuth();

  const { cart } = useCartStore((state) => state) || [];
  const { deliveryMethod } = useCheckout((state) => state) || {};
  const cartTotal = (cart.length > 0 && cart.reduce((acc, item) => acc + item.quantity * item.price, 0)) || 0;
  const deliveryMethodExists = Object.keys(deliveryMethod).length;
  const cartTotalWithDelivery = deliveryMethodExists ? cartTotal + deliveryMethod.price : cartTotal;
  const router = useRouter();

  // useEffect(() => {
  //   if (cart.length === 0) {
  //     router.push("/devices/")
  //   }
  // }, []);

  useEffect(() => {
    window.localStorage.removeItem('payer');
  }, [router]);

  return (
    <CheckoutLayout>
      <Container>
        <section className=" md:mt-[200px]  mt-[100px] grid grid-cols-1 ">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className={`flex w-full gap-2 rounded-lg px-4 py-4 text-left font-base focus:outline-none focus-visible:ring items-center focus-visible:ring-gray-500 focus-visible:ring-opacity-75 text-sm md:text-lg ${open ? 'border-x border-t ' : 'border'} shadow-sm leading-6`}>
                  <FiShoppingCart />
                  <span> {open ? 'Esconder' : 'Mostrar'} resumen del pedido</span>
                  <BsChevronDown className={`${open ? 'rotate-180 transform' : ''} h-4 w-4  transition-all`} />
                  <span className="ml-auto text-lg md:text-2xl">S/. {cartTotalWithDelivery}</span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4  text-gray-500 border-x border-b">
                  <OrderSummary />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </section>
        <section>
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
        </section>
        <CheckoutFlow />
      </Container>
    </CheckoutLayout>
  );
};

export default Checkout;
