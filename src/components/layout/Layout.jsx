import dynamic from 'next/dynamic.js';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import Header from '../Header/Header.jsx';
import MiniCart from '../MiniCart/MiniCart.jsx';

const DynamicCart = dynamic(() => import('../MiniCart/MiniCart.jsx'), {
  suspense: true,
});

// import Footer from './Footer.jsx';
const Layout = ({ children, title, description }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const pageTitle = title ? `${title} | Puffin Case` : 'Puffin Case';
  const pageDescription = description || 'Explora sin preocupaciones';
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <meta name="description" content={pageDescription}></meta>
      </Head>
      <Header />
      <MiniCart />
      <main className="md:pt-24 pt-20">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
