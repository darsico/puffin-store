import Link from 'next/link';
import logo from '../../../public/logo.svg';
import { CgShoppingCart } from 'react-icons/cg';
import { IoIosMenu } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import CartIcon from '../MiniCart/CartIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    isMenuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }, [isMenuOpen]);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className=" fixed top-0 left-1/2 transform -translate-x-1/2  z-30 bg-blend-darken bg-white lg:w-[1024px] w-[90%]">
      <section className="container mx-auto flex justify-between items-center px-4 py-3 overflow-y-auto ">
        <div className="flex justify-between items-center z-30 ">
          <Link href="/">
            <a>
              <figure className="w-36 lg:w-44">
                <Image src={logo} alt="logo" className="" />
              </figure>
            </a>
          </Link>
        </div>
        <div className="flex flex-wrap ">
          <nav className={`${isMenuOpen ? 'fixed  bg-white' : 'hidden'}   lg:flex items-center justify-center left-0 top-0 lg:relative h-full w-full lg:w-fit lg:h-full z-20 lg:z-0 px-6 text-3xl lg:text-xl `}>
            <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-fit h-full lg:h-fit justify-center  lg:justify-start">
              <Link href="/shop">
                <a onClick={handleMenuClose}>Cases</a>
              </Link>
              <Link href="/explore">
                <a onClick={handleMenuClose}>Explora</a>
              </Link>
              <Link href="/sale">
                <a onClick={handleMenuClose}>Sale</a>
              </Link>
            </div>
          </nav>

          <div className="pr-3">{isMenuOpen ? <GrClose className="z-30 text-2xl hover:cursor-pointer" onClick={() => setIsMenuOpen(false)} /> : <IoIosMenu className="text-3xl hover:cursor-pointer lg:hidden" onClick={() => setIsMenuOpen(true)} />}</div>
          <CartIcon />
        </div>
      </section>
    </header>
  );
};

export default Header;
