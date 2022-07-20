import Head from 'next/head';
import Header from '../Header/Header.jsx';

// import Footer from './Footer.jsx';
const Layout = ({ children, title, description }) => {
  const pageTitle = title ? `${title} | Puffin Case` : 'Puffin Case';
  const pageDescription = description || 'Explora sin preocupaciones';
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <meta name="description" content={pageDescription}></meta>
      </Head>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
