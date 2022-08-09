import Link from 'next/link';
import logo from '../../../public/logo.svg';
import { BsChevronDown, BsChevronLeft } from 'react-icons/bs';
import { IoIosMenu } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, Fragment } from 'react';
import CartIcon from '../MiniCart/CartIcon';
import { GET_ALL_DEVICES } from '../../data/queryDevice';
import { useQuery } from '@apollo/client';
import SignInButton from '../Buttons/SignInButton';
import { useAuth } from '../../../context/AuthContext';
import LogOutButton from '../Buttons/LogOutButton';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai';
import isotype from '../../../public/isotipo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const { data } = useQuery(GET_ALL_DEVICES);
  const { user } = useAuth();
  useEffect(() => {
    isMenuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }, [isMenuOpen]);

  const handleDeviceMenuClose = () => {
    setIsDeviceMenuOpen((value) => !value);
    setIsMenuOpen(false);
  };
  const handleCancelClick = () => {
    setIsMenuOpen(false);
    setIsDeviceMenuOpen(false);
  };
  const handleSubmenuClick = () => {
    setIsDeviceMenuOpen(!isDeviceMenuOpen);
  };

  return (
    <header className=" fixed top-0 left-1/2 transform -translate-x-1/2  z-30  bg-white w-full ">
      <section className=" flex items-center justify-between lg:px-4 px-2  py-3 md:py-5 mx-auto  lg:w-[1024px] w-[95%] ">
        <div className="z-30 flex items-center justify-between ">
          <Link href="/">
            <a>
              <figure className="w-28 lg:w-36">
                <Image src={logo} alt="logo" className="" />
              </figure>
            </a>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 ">
          <nav className={` hidden lg:flex items-center justify-center left-0 top-0 lg:relative  w-full lg:w-fit lg:h-full lg:z-20  text-3xl lg:text-xl -translate-x-3`}>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? 'bg-gray-100' : 'text-opacity-90'}
                group inline-flex items-center rounded-md  p-3  text-lg font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span>Compra por modelo</span>
                    <BsChevronDown
                      className={`${open ? 'rotate-180' : ''}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl shadow-[0px_3010px_0_3000px_rgba(0,0,0,0.5)]">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                          {data &&
                            data.queryDeviceModel.map((item) => {
                              const { id, name } = item;
                              const slug = name.toLowerCase().replace(/ /g, '-');
                              return (
                                <Link href={`/devices/${slug}`}>
                                  <li key={id} className="flex items-center justify-start hover:bg-gray-100 hover:bg-opacity-80  p-2 hover:cursor-pointer  transition-all">
                                    <a>{name}</a>
                                  </li>
                                </Link>
                              );
                            })}
                        </div>
                        <div className="bg-gray-50 px-10 py-4 flex justify-between items-center">
                          <span className="flex items-center">
                            <span className="text-base font-semibold text-gray-900 opacity-70">Explora todos nuestros diseños según tu modelo de Celular</span>
                          </span>
                          {/* <span className="block text-sm text-gray-500"></span> */}
                          <figure className="w-8 opacity-90">
                            <Image src={isotype} alt="logo" className="" />
                          </figure>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </nav>
          <Transition appear show={isMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleCancelClick}>
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black bg-opacity-25 hover:cursor-pointer" />
              </Transition.Child>
              <div className="fixed inset-0 overflow-hidden top-10 -left-5 ">
                <div className="flex items-start justify-start p-4 text-center overflow-hidden">
                  <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="-left-100 opacity-0 " enterTo="left-0 opacity-1000  " leave="ease-in duration-200" leaveFrom="left-0 opacity-100" leaveTo="-left-100 opacity-0 ">
                    <Dialog.Panel className=" transform overflow-hidden  bg-white pt-10 px-10 pb-40 text-left align-middle shadow-xl transition-all w-[70vw] h-screen relative flex flex-col justify-between ">
                      <div onClick={handleSubmenuClick} className="text-2xl font-medium cursor-pointer w-full flex justify-between items-center hover:font-semibold transition-all ">
                        <h3 className="transition-all"> Compra por modelo</h3>
                        <span style={{ transform: 'rotate(-90deg)' }}>
                          <BsChevronDown />
                        </span>
                      </div>
                      <AnimatePresence>
                        {isDeviceMenuOpen && (
                          <motion.div className=" h-full w-full bg-white z-[100] absolute top-0 left-0 pt-6" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%', opacity: 0 }} transition={{ duration: 0.3 }}>
                            <div className="flex items-start justify-between px-10 flex-col gap-10">
                              <h4 onClick={handleSubmenuClick} className="text-xl font-medium cursor-pointer flex items-center  gap-1 hover:font-bold transition-all">
                                <BsChevronLeft />
                                Menu
                              </h4>
                              <ul className={` flex flex-col gap-5 px-5 overflow-y-auto`}>
                                {data &&
                                  data.queryDeviceModel.map((item) => {
                                    const { id, name } = item;
                                    const slug = name.toLowerCase().replace(/ /g, '-');
                                    return (
                                      <li key={id} className="flex items-center justify-start w-full hover:font-bold transition-all text-lg">
                                        <Link href={`/devices/${slug}`}>
                                          <a onClick={handleDeviceMenuClose}>{name}</a>
                                        </Link>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="flex flex-col gap-3">
                        <h5 className="text-md">Visita nuestras redes sociales:</h5>
                        <div className="flex gap-2 text-4xl">
                          <AiOutlineInstagram className="hover:scale-110 transition-all cursor-pointer" />
                          <AiFillFacebook className="hover:scale-110 transition-all cursor-pointer" />
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          {user ? <p>{user.email}</p> : null}
          <SignInButton />
          {user && <LogOutButton />}
          <div className="z-30 pr-3">{isMenuOpen ? <GrClose className="z-30 text-2xl hover:cursor-pointer" onClick={handleCancelClick} /> : <IoIosMenu className="text-3xl hover:cursor-pointer lg:hidden" onClick={() => setIsMenuOpen(true)} />}</div>
          <CartIcon />
        </div>
      </section>
    </header>
  );
};

export default Header;
