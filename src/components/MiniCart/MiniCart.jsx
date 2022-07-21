import { useCartStore, useStore } from '../../store';
import { GrClose } from 'react-icons/gr';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MiniCart.module.css';

const MiniCart = () => {
  const { isOpenCart, setIsOpenCart } = useStore((state) => state);

  const { cart, decreaseOne, increaseOne } = useCartStore((state) => state) || [];

  const variants = {
    open: { opacity: 1, x: 0, boxShadow: '0 0 0 3000px rgba(0, 0, 0, 0.5)' },
    closed: { opacity: 0, x: '100%', boxShadow: '0 0 0 0px' },
  };
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const reduceQuantity = (id) => {
    decreaseOne(id);
  };
  const increaseQuantity = (id) => {
    increaseOne(id);
  };
  return (
    <AnimatePresence>
      {isOpenCart && (
        <motion.section className={`${styles.cartContainer} z-50 fixed right-0 top-0 h-full w-screen md:w-[50%] lg:w-[40%]  bg-gray-100 box-border p-5`} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3 }}>
          <div className="absolute top-0 left-0 flex text-3xl w-full flex-wrap justify-between content-center p-5">
            <h2 className="font-medium">Tu Carrito</h2>
            <GrClose onClick={() => setIsOpenCart(false)} className="hover:cursor-pointer" />
          </div>
          <div className="relative mt-20 h-[50vh] overflow-auto py-8 ">
            <ul className="flex flex-col gap-2 ">
              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  const { productId, name, price, quantity, productImage, device, color } = item;
                  return (
                    <li key={productId} className="grid grid-cols-[1fr_3fr_0.5fr] bg-white p-3 rounded-md">
                      <figure className="w-28">
                        <img src={productImage[0]} alt="" className="object-cover" />
                      </figure>
                      <div className="px-2 h-full flex flex-col justify-between">
                        <div className="">
                          <p className="text-lg font-semibold">
                            {name} {quantity === 1 ? '' : `x ${quantity}`}
                          </p>
                          <p className="text-sm text-gray-400 font-medium mb-auto">
                            {device} / {color}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button className="px-2 bg-gray-100 text-base hover:bg-gray-300  transition-all" onClick={() => reduceQuantity(productId)}>
                            -
                          </button>
                          <p className="text-lg px-5">{quantity}</p>
                          <button className="px-2 bg-gray-100 text-base hover:bg-gray-300 transition-all" onClick={() => increaseQuantity(productId)}>
                            +
                          </button>
                        </div>
                        <p className="text-sm text-gray-400 font-medium ">Eliminar</p>
                      </div>
                      <p className="self-end text-xl font-semibold">S/.{(price * quantity).toFixed(2)}</p>
                    </li>
                  );
                })
              ) : (
                <p className="bg-white p-20 text-lg rounded-md text-center text-gray-400 font-medium ">Tu carrito es vacío.</p>
              )}
            </ul>
          </div>
          {cart && cart.length > 0 && (
            <div className="absolute bottom-0 left-0 p-5 w-full bg-gray-100">
              <div className="flex justify-between py-4 items-center">
                <h3 className="text-xl">Subtotal</h3>
                <p className="text-2xl font-semibold">S/.{cartSubtotal}</p>
              </div>
              <button className="w-full p-5 bg-black text-white text-2xl">Checkout</button>
              <p className=" leading-5 pt-2">*Los impuestos y el envío serán calculados al momento del pago</p>
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
