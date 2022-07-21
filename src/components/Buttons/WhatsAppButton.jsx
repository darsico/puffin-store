import { IoLogoWhatsapp } from 'react-icons/io';
import { useStore } from '../../store';
import { useRouter } from 'next/router';
const WhatsAppButton = () => {
  const { variantOption, productItem } = useStore((state) => state);
  const { price, salePrice } = variantOption;
  const { name, deviceModel } = productItem;

  const apiWhatsApp = `https://api.whatsapp.com/send?phone=51948023248&text=Hola%20Puffin%20Case%20Store,%20quiero%20comprar%20el%20siguiente%20producto:%20${name};%20Modelo:%20;%20el%20precio%20es%20el%20siguiente:%20S/.%20${salePrice || price}.%20Muchas%20Gracias`;

  const router = useRouter();
  const handleWACLick = () => {
    router.push('/', null, { shallow: true });
  };

  return (
    <>
      <a
        href={apiWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white transition-colors border border-transparent rounded-md bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        onClick={() => handleWACLick()}
      >
        Pedir en <IoLogoWhatsapp className="mx-3 scale-150" /> por S/.{salePrice || price}
      </a>
    </>
  );
};

export default WhatsAppButton;
