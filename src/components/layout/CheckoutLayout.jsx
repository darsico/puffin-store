import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.svg';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
// import Footer from './Footer.jsx';
const CheckoutLayout = ({ children, title, description }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const pageTitle = title ? `${title} | Puffin Case` : 'Puffin Case';
  const pageDescription = description || 'Explora sin preocupaciones';
  const { user } = useAuth();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <meta name="description" content={pageDescription}></meta>
      </Head>
      <header className=" absolute top-0 left-1/2 transform -translate-x-1/2  z-30 w-full ">
        <section className=" flex items-center justify-between lg:px-4 px-2  py-3 md:py-5 mx-auto  lg:w-[1024px] w-[95%] ">
          <div className="z-30 flex items-center justify-between w-full">
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50">
              <Link href="/">
                <a>
                  <figure className="w-40 lg:w-60">
                    <Image src={logo} alt="logo" className="" />
                  </figure>
                </a>
              </Link>
              <p className="text-center md:text-2xl text-xl text-slate-900 pt-2 md:pt-3 font-semibold">Explora.</p>
            </div>
            <div className=" absolute top-0 left-0 w-full md:h-[220px] h-[150px]">{/* <video className="w-full h-full object-cover" autoPlay muted src={'https://res.cloudinary.com/dhp1q5rxn/video/upload/v1660081497/checkout-assets/surf_szakjk.mp4'}></video> */}</div>
          </div>
        </section>
      </header>

      <main className="md:pt-24 pt-20">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default CheckoutLayout;
