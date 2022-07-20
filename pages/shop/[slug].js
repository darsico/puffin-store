import Image from 'next/image';
import { useEffect } from 'react';
import AddToCartButton from '../../src/components/Buttons/AddToCartButton';
import CheckoutButton from '../../src/components/Buttons/CheckoutButton';
import WhatsAppButton from '../../src/components/Buttons/WhatsAppButton';
import Carousel from '../../src/components/Carousel/CarouselWithThumb';
import Layout from '../../src/components/layout/Layout';
import Options from '../../src/components/Options/Options';
import Price from '../../src/components/Price/Price';
import { SINGLE_CASE_DESIGN } from '../../src/data/queryCaseDesign';
import { GET_SLUGS } from '../../src/data/querySlugs';
import { useQuery } from '../../src/hooks/useQuery';
import { getProductItem, state, useCartStore, useStore } from '../../src/store';

export const getStaticPaths = async () => {
  const { data } = await useQuery(GET_SLUGS);
  const paths = data.queryCaseDesign.map((item) => ({ params: { slug: item.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  const VARIABLES = { slug: slug };
  const { data } = await useQuery(SINGLE_CASE_DESIGN, VARIABLES);

  return {
    props: {
      productItem: data.getCaseDesign,
    },
    revalidate: 60,
  };
};

const ProductPage = ({ productItem }) => {
  const { name, id, series, slug, description, variants, deviceModel } = productItem;
  // const totalItems = useCartStore((state) => state.cart.length);
  // console.log(totalItems);
  useEffect(() => {
    useStore.getState().setProductItem(productItem);
    useStore.getState().setInitialVariantOption(variants[0]);
  }, []);

  return (
    <Layout title={name} description={description}>
      <section className="grid items-start w-11/12 , grid-cols-1 md:grid-cols-2 p-6 mx-auto md:max-w-screen-lg md:flex-row gap-4 lg:gap-5 ">
        <div className="  ">
          <Carousel data={variants} />
        </div>
        {/* Product info */}
        <div className="max-w-2xl mx-auto pb-16 px-4 sm:px-0 lg:pt-0 lg:pb-24 lg:grid lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] ">
          <div className="lg:col-span-2 ">
            {/* <h2>{totalItems} productos</h2> */}
            <h4 className="text-base text-gray-400 font-medium">{series}</h4>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
            <p className="text-gray-600 text-xl">Diseñado para {deviceModel[0].name}</p>
            <Price />
          </div>
          {/* Description */}
          <div className=" lg:pt-6 lg:pb-5 lg:col-start-1 lg:col-span-2  pt-4">
            <h3 className="sr-only">Descripción</h3>
            <div className="">{description || <p className="text-base text-gray-900">{description}</p>}</div>
          </div>

          <div className=" flex flex-col gap-5 pt-5">
            <Options variants={variants} />
            <div className="flex flex-col gap-5 ">
              <CheckoutButton />
              <AddToCartButton />
              <WhatsAppButton />
            </div>
            <p className="mt-5 text-xs text-gray-800">*Pedidos por WhatsApp: Si estas en una computadora, asegúrate de que este activado el WhatsApp Web</p>
            <p className="mt-5 text-xs text-gray-800">*Pronto se habilitaran otros medios de pago.</p>
          </div>
          {/* Price and ADD TO CART  END */}
        </div>
      </section>
    </Layout>
  );
};

export default ProductPage;
