import CheckoutInfo from './CheckoutInfo';
import PaymentMethods from './PaymentMethods';

const PaymentForm = ({ selectedIndex, changeTab }) => {
  return (
    <>
      <CheckoutInfo selectedIndex={selectedIndex} changeTab={changeTab} />
      <PaymentMethods />
    </>
  );
};

export default PaymentForm;
