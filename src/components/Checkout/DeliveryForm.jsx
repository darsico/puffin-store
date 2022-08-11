import CheckoutInfo from './CheckoutInfo';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useCheckout } from '../../store';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const data = [
  {
    name: 'Free Lima',
    price: 0,
    description: 'Envío a domicilio',
    duration: '5-7 días',
    details: 'Solo aplica para Lima',
    smallPrint:
      'Disponible para los siguientes distritos: San Isidro, San Borja, Miraflores, Surquillo, Pachacamac, El Olivar, Lince, Breña,  Chaclacayo, Carabayllo, Comas, Chorrillos, La Molina, La Victoria, Laredo, Los Olivos, Magdalena, Pachacámac, Pucusana, Puente Piedra, Punta Hermosa, Rímac, San Isidro, San Juan de Lurigancho, San Juan de Miraflores, San Luis, Santa Anita, Santa Rosa, Santiago de Surco, Villa El Salvador, Villa María del Triunfo',
  },
  {
    name: 'Express',
    price: 15,
    description: 'Envío a domicilio',
    duration: '1-2 días',
    details: 'Solo aplica para Lima',
    smallPrint:
      'Disponible para los siguientes distritos: San Isidro, San Borja, Miraflores, Surquillo, Pachacamac, El Olivar, Lince, Breña, Pardo, Chaclacayo, Carabayllo, Comas, Chorrillos, Huaral, Huarochirí, La Molina, La Victoria, Laredo, Los Olivos, Magdalena, Mariscal Cáceres, Miraflores de la Sierra, Pachacámac, Pucusana, Puente Piedra, Punta Hermosa, Rímac, San Isidro, San Juan de Lurigancho, San Juan de Miraflores, San Luis, Santa Anita, Santa Rosa, Santiago de Surco, Surquillo, Villa El Salvador, Villa María del Triunfo',
  },
  // {
  //   name: 'Standard Provincias',
  //   price: 20,
  //   description: 'Envío a domicilio o Agencia',
  //   duration: '5 a 10 días',
  //   details: 'Solo aplica para provincias seleccionadas*',
  //   smallPrint: 'Disponible para las siguientes provincias: Lima, Arequipa, Cusco, Trujillo, Puno, Tumbes, Arequipa, Cusco, Trujillo, Moquegua',
  // },
  // {
  //   name: 'Express Provincias',
  //   price: 29,
  //   description: 'Envío a domicilio o Agencia',
  //   duration: '2-3 días',
  //   details: 'Solo aplica para provincias seleccionadas*',
  //   smallPrint: 'Disponible para las siguientes provincias: Lima, Arequipa, Cusco, Trujillo, Puno, Tumbes, Arequipa, Cusco, Trujillo, Moquegua',
  // },
];

const DeliveryForm = ({ goToPaymentSection, changeTab, selectedIndex }) => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

  const { setDeliveryMethod, deliveryMethod } = useCheckout((state) => state);

  const deliveryMethodExists = Object.keys(deliveryMethod).length;

  const handleSelected = (index, method) => {
    setSelectedDeliveryMethod(index);
    setDeliveryMethod({ ...method, index });
  };

  useEffect(() => {
    if (deliveryMethodExists) {
      setSelectedDeliveryMethod(deliveryMethod.index);
    }
  }, []);

  return (
    <>
      <CheckoutInfo changeTab={changeTab} selectedIndex={selectedIndex} />
      <section className="py-10 w-full">
        <h3 className="text-2xl pb-1 font-semibold ">Métodos de Delivery</h3>
        {!deliveryMethodExists && <p className="w-full  text-gray-400 pb-3">*Selecciona el método delivery para continuar por favor</p>}
        <div className="flex flex-col gap-5 border-">
          {data.map((method, index) => (
            <div className={`flex justify-between items-start   rounded-md  p-5  flex-col relative border- ${selectedDeliveryMethod === index ? 'border-2 shadow-lg border-black' : 'border '} cursor-pointer`} key={index} onClick={() => handleSelected(index, method)}>
              <h3 className="font-medium text-xl ">{method.name}</h3>
              {selectedDeliveryMethod === index && <IoIosCheckmarkCircle className="text-3xl absolute top-5 right-5" />}
              <p className="text-base text-gray-400">{method.description}</p>
              <p className="text-base text-gray-400">{method.duration}</p>
              <p className="text-base text-gray-400">{method.details}*</p>
              <p className="font-medium text-xl pt-5">{method.price === 0 ? 'Gratis' : `S/. ${method.price}`}</p>
            </div>
          ))}
        </div>
      </section>
      <button onClick={goToPaymentSection} className={`p-3 text-white bg-black ${deliveryMethodExists ? '' : 'opacity-60 cursor-default'} w-full hover:bg-gray-900 transition-all`}>
        Métodos de Pago
      </button>
      <button className="w-full py-5 hover:font-semibold flex items-center justify-center gap-2  " onClick={() => changeTab(0)}>
        <MdOutlineArrowBackIosNew /> Regresar a Contacto
      </button>
    </>
  );
};

export default DeliveryForm;
