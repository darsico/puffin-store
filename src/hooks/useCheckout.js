import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCartStore, useStore } from '../store';

const useCheckout = (order) => {
  const [isLoading, setIsLoading] = useState(false);
  const { clearCart } = useCartStore((state) => state);
  const { setIsOpenCart } = useStore((state) => state);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const config = {
    method: 'POST',
    url: `${baseURL}/api/payment`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: order,
  };

  const mpCheckout = async () => {
    console.log(order);
    setIsLoading(true);
    try {
      const response = await axios(config);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data.init_point);
        const { init_point } = response.data;
        router.push(init_point, undefined, { shallow: true });
        setIsLoading(false);
        setIsOpenCart(false);
        clearCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { mpCheckout, isLoading };
};

export default useCheckout;
