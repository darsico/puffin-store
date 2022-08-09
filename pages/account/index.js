import Layout from '../../src/components/layout/Layout';

const AccountPage = () => {
  return (
    <Layout>
      <p>Account Page this is a protected route</p>
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
