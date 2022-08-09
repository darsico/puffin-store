import { AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';

const SignInButton = () => {
  const { user } = useAuth();

  const link = `${user ? '/account' : '/account/login'}`;

  return (
    <Link href={link}>
      <AiOutlineUser className=" text-2xl  lg:text-3xl  hover:cursor-pointer" href="" />
    </Link>
  );
};

export default SignInButton;
