import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../src/components/layout/Layout';
import TinyLoader from '../../src/components/Loaders/TinyLoader';
import Orders from '../../src/components/Orders/Orders';
import Container from '../../src/components/UI/Container';
const AccountPage = () => {
  const { user, getOrCreateDocument, setOrders } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await getOrCreateDocument(user.email);
      setOrders(response);
      console.log(response);
      setLoading(false);
    };
    if (user) {
      fetchOrders();
    }
  }, []);

  return (
    <Layout>
      <Container>
        <section className="py-10">
          <h3 className="text-4xl font-bold leading-6 text-gray-900 ">Mi cuenta</h3>
          <section className=" mx-auto py-6  grid grid-cols-1 md:grid-cols-2">
            <div>
              <h4 className="text-xl font-medium">Mis ordenes</h4>
              <Orders loading={loading} />
            </div>
            <div>
              <h4 className="text-xl font-medium">Detalles de la cuenta</h4>
              {user.displayName && <p> Nombre: {user.displayName}</p>}
              <p> Correo: {user.email}</p>
            </div>
          </section>
        </section>
      </Container>
    </Layout>
  );
  // const { user, error, isLoading } = useUser();
  // console.log(user);
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>{error.message}</p>;
  // if (user) {
  //   return (
  //     <>
  //       <p>{user.name}</p>
  //       <p>{user.email}</p>
  //       {/* logout button */}
  //       <a href="/api/auth/logout">Logout</a>
  //     </>
  //   );
  // }
  // return <a href="/api/auth/login">Login</a>;
};

export default AccountPage;
