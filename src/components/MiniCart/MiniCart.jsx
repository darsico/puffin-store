import { useCartStore, useStore } from '../../store';
import { GrClose } from 'react-icons/gr';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MiniCart.module.css';
import { useState } from 'react';
import TinyLoader from '../Loaders/TinyLoader';
import useCheckout from '../../hooks/useCheckout';

const MiniCart = () => {
  const { isOpenCart, setIsOpenCart } = useStore((state) => state);
  const { cart, decreaseOne, increaseOne, removeCart } = useCartStore((state) => state) || [];

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const reduceQuantity = (id) => {
    decreaseOne(id);
  };
  const increaseQuantity = (id) => {
    increaseOne(id);
  };

  const { mpCheckout, isLoading } = useCheckout(cart);

  const checkoutCart = async () => {
    try {
      await mpCheckout();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = (id) => {
    removeCart(id);
  };
  return (
    <AnimatePresence>
      {isOpenCart && (
        <motion.section
          className={`${styles.cartContainer} z-50 fixed right-0 top-0 h-full w-screen md:w-[50%] lg:w-[40%]  bg-gray-100 box-border md:p-5 pt-5 pb-1 px-5`}
          initial={{ x: '100%', boxShadow: '0 0 0 0px' }}
          animate={{ x: 0, boxShadow: '0 0 0 3000px rgba(0, 0, 0, 0.5)' }}
          exit={{ x: '100%', boxShadow: '0 0 0 0px' }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 left-0 flex flex-wrap content-center justify-between w-full p-5 text-3xl">
            <h2 className="font-medium">Tu Carrito</h2>
            <GrClose onClick={() => setIsOpenCart(false)} className="hover:cursor-pointer" />
          </div>
          <div className="relative mt-10 lg:mt-20 h-[50vh] overflow-auto py-8 ">
            <ul className="flex flex-col gap-2 ">
              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  const { productId, name, price, quantity, productImage, device, color } = item;
                  return (
                    <motion.li key={productId} className="grid md:grid-cols-[1fr_3fr_0.5fr] grid-cols-[1fr_2fr] bg-white p-3 rounded-md h-fit" initial={{ y: '50%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '50%', opacity: 0 }} transition={{ duration: 0.6 }}>
                      <figure className="w-28">
                        <img src={productImage[0]} alt="" className="object-cover" />
                      </figure>
                      <div className="flex flex-col justify-between h-fit md:h-full px-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-lg font-semibold">
                            {name} {quantity === 1 ? '' : `x ${quantity}`}
                          </p>
                          <p className="mb-auto text-sm font-medium text-gray-400">
                            {device} / {color}
                          </p>
                          <p className="md:self-end md:text-xl md:font-semibold font-medium md:hidden block">S/.{(price * quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center">
                          <button className="px-2 text-base transition-all bg-gray-100 hover:bg-gray-300" onClick={() => reduceQuantity(productId)}>
                            -
                          </button>
                          <p className="px-5 text-lg">{quantity}</p>
                          <button className="px-2 text-base transition-all bg-gray-100 hover:bg-gray-300" onClick={() => increaseQuantity(productId)}>
                            +
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 transition-all font-base hover:cursor-pointer hover:text-gray-600 pt-2 md:pt-0" onClick={() => removeFromCart(productId)}>
                          Eliminar del carrito
                        </p>
                      </div>
                      <p className="md:self-end md:text-xl md:font-semibold font-medium md:block hidden">S/.{(price * quantity).toFixed(2)}</p>
                    </motion.li>
                  );
                })
              ) : (
                <p className="p-20 text-lg font-medium text-center text-gray-400 bg-white rounded-md ">Tu carrito es vacío.</p>
              )}
            </ul>
          </div>
          {cart && cart.length > 0 && (
            <div className="absolute bottom-0 left-0 w-full px-5 pt-2 pb-5 md:p-5  bg-gray-100">
              <div className="flex items-center justify-between py-4">
                <h3 className="text-xl">Subtotal</h3>
                <p className="text-2xl font-semibold">S/.{cartSubtotal}</p>
              </div>
              <button className="flex items-center justify-center w-full gap-8 p-5 text-2xl text-white bg-black" onClick={checkoutCart}>
                Pagar Ahora
                {isLoading ? (
                  <span className="scale-150">
                    <TinyLoader />
                  </span>
                ) : (
                  ''
                )}
              </button>
              <p className="pt-2 leading-5 ">*Los impuestos y el envío serán calculados al momento del pago</p>
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
