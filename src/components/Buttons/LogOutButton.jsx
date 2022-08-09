import { useAuth } from '../../../context/AuthContext';

const LogOutButton = () => {
  const { logOut } = useAuth();
  const handleLogOut = () => {
    logOut();
  };

  return (
    <button className="" onClick={handleLogOut}>
      Salir
    </button>
  );
};

export default LogOutButton;
