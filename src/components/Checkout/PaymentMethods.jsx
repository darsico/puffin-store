import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import mercadoPagoIcon from '../../assets/checkoutIcons/mercado_pago_icon.svg';
import visaIcon from '../../assets/checkoutIcons/visa.svg';
import masterCardIcon from '../../assets/checkoutIcons/mastercard.svg';
import amexIcon from '../../assets/checkoutIcons/amex.svg';
import dinnersIcon from '../../assets/checkoutIcons/dinners.svg';
import cashIcon from '../../assets/checkoutIcons/cash_icon.svg';
import redirectIcon from '../../assets/checkoutIcons/redirect_window.svg';
import cashOnDeliveryIcon from '../../assets/checkoutIcons/cash_on_delivery.svg';
import FinishOrderButton from '../Buttons/FinishOrderButton';

const methods = [
  {
    name: 'Mercado Pago',
    id: 'mercadoPagoMethod',
    iconName: mercadoPagoIcon,
    paymentIcons: [visaIcon, masterCardIcon, dinnersIcon, amexIcon],
    description: 'Luego de hacer clic en “Finalizar Pedido”, serás redirigido a Mercado Pago para completar tu compra de forma segura.',
    descriptionIcon: redirectIcon,
  },
  {
    name: 'Pago Contraentrega',
    id: 'cashOnDeliveryMethod',
    iconName: null,
    paymentIcons: [cashIcon, visaIcon, masterCardIcon],
    description: 'Puedes pagar con efectivo o tarjeta al momento de la entrega, llevaremos POS.',
    descriptionIcon: cashOnDeliveryIcon,
  },
];

const PaymentMethods = () => {
  const [typeOfPayment, setTypeOfPayment] = useState(methods[0]);
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold">Método de pago</h2>
      <p>Todas las transacciones son seguras y están cifradas.</p>
      <RadioGroup value={typeOfPayment} onChange={setTypeOfPayment}>
        <RadioGroup.Label className="sr-only">Métodos de Pago</RadioGroup.Label>
        <div className="space-y-4 pt-6 pb-4">
          {methods.map((method) => (
            <RadioGroup.Option
              key={method.id}
              value={method}
              className={({ active, checked }) =>
                `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : ''}
                 
                    relative flex cursor-pointer px-5 py-4 shadow-md border rounded-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex flex-col  w-full items-start py-2">
                    {/* <div className="flex items-center"> */}
                    <div className={`text-sm flex items-start gap-4 w-full  ${checked && 'border-b-2 pb-4'}`}>
                      <RadioGroup.Label as="p" className={`font-medium`}>
                        {checked ? <MdRadioButtonChecked className=" text-3xl" /> : <MdRadioButtonUnchecked className="opacity-30 text-3xl" />}
                      </RadioGroup.Label>
                      <RadioGroup.Description as="span" className={` flex flex-col gap-2`}>
                        {method.iconName === null ? <p className="text-xl">{method.name}</p> : <img src={method.iconName.src} className="w-28" />}
                        <div className="flex gap-2">
                          {method.paymentIcons.map((icon) => (
                            <img src={icon.src} className="w-10" />
                          ))}
                        </div>
                      </RadioGroup.Description>
                    </div>
                    {/* </div> */}
                    {checked && (
                      <div className="shrink-0 px-4 py-8 flex flex-col items-center justify-center gap-3 opacity-70">
                        <img src={method.descriptionIcon.src} alt="" className="w-28" />
                        <p className="text-center">{method.description}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <FinishOrderButton typeOfPayment={typeOfPayment} />
    </section>
  );
};

export default PaymentMethods;
