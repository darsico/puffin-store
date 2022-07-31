import Link from 'next/link';
import logo from '../../../public/logo.svg';
import { BsChevronDown } from 'react-icons/bs';
import { IoIosMenu } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CartIcon from '../MiniCart/CartIcon';
import { GET_ALL_DEVICES } from '../../data/queryDevice';
import { useQuery } from '@apollo/client';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const { data } = useQuery(GET_ALL_DEVICES);
  // useEffect(() => {
  //   if (data) console.log(data);
  // }, [data]);

  useEffect(() => {
    isMenuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }, [isMenuOpen]);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleDeviceMenuClick = () => {
    setIsDeviceMenuOpen((value) => !value);
  };
  const handleDeviceMenuClose = () => {
    setIsDeviceMenuOpen((value) => !value);
    setIsMenuOpen(false);
  };
  const handleCancelClick = () => {
    setIsMenuOpen(false);
    setIsDeviceMenuOpen(false);
  };
  return (
    <header className=" fixed top-0 left-1/2 transform -translate-x-1/2  z-30  bg-white lg:w-[1024px] w-[95%]">
      <section className="container flex items-center justify-between lg:px-4 px-2  py-3 mx-auto overflow-y-auto ">
        <div className="z-30 flex items-center justify-between ">
          <Link href="/">
            <a>
              <figure className="w-28 lg:w-40">
                <Image src={logo} alt="logo" className="" />
              </figure>
            </a>
          </Link>
        </div>
        <div className="flex flex-wrap ">
          <nav className={`${isMenuOpen ? 'fixed  top-0 left-0  bg-white h-[100vh] w-[100vw]' : 'hidden'}   lg:flex items-center justify-center left-0 top-0 lg:relative h-full w-full lg:w-fit lg:h-full z-20 lg:z-0 px-6 text-3xl lg:text-xl -translate-x-3`}>
            <div className="flex flex-col justify-center w-full h-full gap-12 lg:flex-row lg:w-fit lg:h-fit lg:justify-start">
              <p onClick={handleDeviceMenuClick} className="flex items-center justify-center gap-2 hover:cursor-pointer">
                Compra por modelo
                <motion.span animate={{ rotate: isDeviceMenuOpen ? 180 : 0 }}>
                  <BsChevronDown />
                </motion.span>
              </p>
              <motion.div className="fixed p-5 px-8 bg-white shadow-2xl top-20" animate={{ translateY: isDeviceMenuOpen ? 0 : -500, opacity: isDeviceMenuOpen ? 1 : 0 }}>
                <ul className={` flex flex-col gap-5`}>
                  {data &&
                    data.queryDeviceModel.map((item) => {
                      const { id, name } = item;
                      const slug = name.toLowerCase().replace(/ /g, '-');
                      return (
                        <li key={id} className="flex items-center justify-start ">
                          <Link href={`/devices/${slug}`}>
                            <a onClick={handleDeviceMenuClose}>{name}</a>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </motion.div>
              {/* <Link href="/explore">
                <a onClick={handleMenuClose}>Explora</a>
              </Link>
              <Link href="/sale">
                <a onClick={handleMenuClose}>Sale</a>
              </Link> */}
            </div>
          </nav>

          <div className="z-30 pr-3">{isMenuOpen ? <GrClose className="z-30 text-2xl hover:cursor-pointer" onClick={handleCancelClick} /> : <IoIosMenu className="text-3xl hover:cursor-pointer lg:hidden" onClick={() => setIsMenuOpen(true)} />}</div>
          <CartIcon />
        </div>
      </section>
    </header>
  );
};

export default Header;
