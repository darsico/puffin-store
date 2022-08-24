import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.svg';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
// import Footer from './Footer.jsx';
const CheckoutLayout = ({ children, title, description }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const pageTitle = title ? `${title} | Puffin Case` : 'Puffin Case';
  const pageDescription = description || 'Explora sin preocupaciones';
  const router = useRouter();
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
      <header className="absolute top-0 z-30 w-full transform -translate-x-1/2 left-1/2">
        <section className=" flex items-center justify-between lg:px-4 px-2  py-3 md:py-5 mx-auto  lg:w-[1024px] w-[95%] ">
          <div className="z-30 flex items-center justify-between w-full">
            <div className="absolute z-50 transform -translate-x-1/2 top-full left-1/2">
              <Link href="/">
                <a>
                  <figure className="w-40 lg:w-60">
                    <Image src={logo} alt="logo" className="" />
                  </figure>
                </a>
              </Link>
              <p className="pt-2 text-xl font-semibold text-center md:text-2xl text-slate-900 md:pt-3">Explora.</p>
            </div>
            <BiArrowBack className="absolute text-2xl transition-all top-16 left-5 md:left-40 md:text-4xl hover:cursor-pointer z-[100] opacity-40 hover:opacity-100" onClick={() => router.back()} />
            <div className=" absolute top-0 left-0 w-full md:h-[220px] h-[150px]">{/* <video className="object-cover w-full h-full" autoPlay muted src={'https://res.cloudinary.com/dhp1q5rxn/video/upload/v1660081497/checkout-assets/surf_szakjk.mp4'}></video> */}</div>
          </div>
        </section>
      </header>

      <main className="pt-20 md:pt-24">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default CheckoutLayout;
