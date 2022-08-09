import { useAuth } from '../../../context/AuthContext';
import TinyLoader from '../Loaders/TinyLoader';

const Orders = ({ loading }) => {
  const { orders } = useAuth();

  if (loading) return <TinyLoader textColor="text-gray-400" />;
  return (
    <>
      {orders && orders.orders.length > 0 ? (
        orders?.orders.map((order, index) => {
          return (
            <div key={index}>
              <p>{order.orderTotal}</p>
              {order.order.map((product, index) => {
                return (
                  <div key={index}>
                    <p>{product.name}</p>
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <p>No hay pedidos</p>
      )}
    </>
  );
};

export default Orders;
