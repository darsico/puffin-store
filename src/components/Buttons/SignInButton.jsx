import { AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';

const SignInButton = () => {
  return (
    <Link href={'/account/login'}>
      <AiOutlineUser className=" text-2xl mr-2 hover:cursor-pointer" href="" />
    </Link>
  );
};

export default SignInButton;
