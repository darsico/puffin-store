import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { BsWindowSidebar } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';
import { useCheckout } from '../../store';
import CheckoutInfo from './CheckoutInfo';
import ContactForm from './ContactForm';
import DeliveryForm from './DeliveryForm';
import PaymentForm from './PaymentForm';

const CheckoutFlow = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allowed, setAllowed] = useState([]);
  const { deliveryMethod } = useCheckout((state) => state);

  const deliveryMethodExists = Object.keys(deliveryMethod).length;

  const changeTab = (index) => {
    setSelectedIndex(index);
    setAllowed((prev) => (prev.includes(index) ? [...prev] : [...prev, index]));
  };

  const goToDeliverySection = (data) => {
    if (window.localStorage.getItem('payer')) {
      changeTab(1);
    }
  };
  const goToPaymentSection = () => {
    if (deliveryMethodExists) {
      changeTab(2);
    }
  };
  const styleTab = (index) => {
    return `${selectedIndex === index ? 'text-gray-900 font-semibold' : 'text-gray-500'} ${allowed.includes(index) ? 'text-gray-500' : 'text-gray-300'} py-4 flex gap-4 items-center`;
  }; 

  return (
    <section className="pt-3">
      <Tab.Group manual selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="grid grid-cols-3 w-fit">
          <Tab className={`${selectedIndex === 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}  py-4 flex gap-4 items-center`}>
            <span className="hover:font-semibold transition-all">Contacto </span>
            <MdArrowForwardIos className="font-light text-gray-400" />
          </Tab>
          <Tab disabled={allowed.includes(1) ? false : true} className={`${styleTab(1)} pl-4`}>
            <span className="hover:font-semibold transition-all">Envío</span> <MdArrowForwardIos className="font-light text-gray-400" />
          </Tab>
          <Tab disabled={allowed.includes(2) ? false : true} className={styleTab(2)}>
            <span className="hover:font-semibold transition-all">Pago</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ContactForm goToDeliverySection={goToDeliverySection} />
          </Tab.Panel>
          <Tab.Panel>
            <DeliveryForm goToPaymentSection={goToPaymentSection} changeTab={changeTab} selectedIndex={selectedIndex} />
          </Tab.Panel>
          <Tab.Panel>
            <PaymentForm selectedIndex={selectedIndex} changeTab={changeTab} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

export default CheckoutFlow;
