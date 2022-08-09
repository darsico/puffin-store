import CheckoutLayout from '../src/components/layout/CheckoutLayout.jsx';
import Container from '../src/components/UI/Container.jsx';

const Checkout = () => {
  return (
    <CheckoutLayout>
      <Container>
        <section className=" md:mt-[200px]  mt-[100px] grid grid-cols-1 ">
          <div className="order ">
            <h1>Order</h1>
          </div>
          <div className="info ">
            <h1>Info</h1>
          </div>
        </section>
      </Container>
    </CheckoutLayout>
  );
};

export default Checkout;
