import { useCartStore, useCheckoutStore } from '../../store';

const CheckoutInfo = ({ changeTab, selectedIndex }) => {
  const { deliveryMethod, payer } = useCheckoutStore((state) => state);

  return (
    <section className="flex flex-col gap-2 border rounded-md p-5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg opacity-50">Contacto</h3>
          <p className="text-lg font-medium"> {payer.email}</p>
        </div>
        <button className="text-sm hover:font-semibold transition-all" onClick={() => changeTab(0)}>
          Cambiar
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg opacity-50">Dirección de Envío</h3>
          <p className="text-lg">
            {payer.address}, {payer.district}, {payer.city}
          </p>
        </div>
        <button className="text-sm hover:font-semibold transition-all" onClick={() => changeTab(0)}>
          Cambiar
        </button>
      </div>
      {selectedIndex === 2 && Object.keys(deliveryMethod).length && (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg opacity-50">Envío</h3>
            <p className="text-lg">
              {deliveryMethod.name}: {deliveryMethod.duration} Hábiles - <span className="font-semibold text-lg">{deliveryMethod.price === 0 ? 'Gratis' : `S/. ${deliveryMethod.price}`}</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutInfo;
