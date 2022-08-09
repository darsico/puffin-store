import { AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';

const SignInButton = () => {
  const { user, isLoading } = useAuth();

  const link = `${user ? '/account' : '/account/login'}`;

  return (
    <Link href={link}>
      <AiOutlineUser className=" text-2xl mr-2 hover:cursor-pointer" href="" />
    </Link>
  );
};

export default SignInButton;
