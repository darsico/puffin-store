import Layout from '../../src/components/layout/Layout';
import ProductCard from '../../src/components/Products/ProductCard';
import Container from '../../src/components/UI/Container';
import { GET_ALL_DEVICES, GET_SINGLE_DEVICE } from '../../src/data/queryDevice';
import { useQuery } from '../../src/hooks/useQuery';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
export const getStaticPaths = async () => {
  const { data } = await useQuery(GET_ALL_DEVICES);
  const paths = data.queryDeviceModel.map((item) => ({ params: { device: item.name.toLowerCase().replace(/\s/g, '-') } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { device } = params;
  const { data: allDevices } = await useQuery(GET_ALL_DEVICES);
  const models = allDevices.queryDeviceModel.map((item) => ({ ...item, slug: item.name.toLowerCase().replace(/\s/g, '-') }));
  const deviceModel = models.find((item) => item.slug === device);
  const VARIABLES = { id: deviceModel.id };
  const { data } = await useQuery(GET_SINGLE_DEVICE, VARIABLES);

  return {
    props: {
      products: data.getDeviceModel,
      allDevices: models,
    },
  };
};

const DeviceShop = ({ products, allDevices }) => {
  const [isHover, setIsHover] = useState(null);
  const router = useRouter();

  const handleDeviceFilterClick = (slug) => {
    router.push({ pathname: `/devices/${slug}`, query: { device: slug } }, undefined, { shallow: false });
  };

  const carouselProperties = {
    prevArrow: <GrPrevious />,
    nextArrow: <GrNext />,
    slidesToShow: 6,
    infinite: true,
    centerMode: false,
    // adaptiveHeight: true,
    // centerPadding: '700px',
    responsive: [
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          initial: 1,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,

          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Layout>
      <Container>
        <h1 className="pt-10 text-2xl">
          Explora nuestros modelos en <span className="font-bold">{products.name}</span>
        </h1>
        <div className="py-10">
          <Slider {...carouselProperties}>
            {allDevices.map((item) => {
              return (
                <div className="flex items-center justify-center hover:cursor-pointer" onMouseEnter={() => setIsHover(item.id)} onMouseLeave={() => setIsHover(null)} onClick={() => handleDeviceFilterClick(item.slug)}>
                  <div className="flex flex-col items-center justify-center w-24 mx-auto">
                    <motion.img src={item.icon} alt={item.name} className="w-full h-full" animate={{ scale: isHover === item.id ? 1.2 : 1 }} />
                    <motion.p className="leading-4 text-center" animate={{ fontWeight: isHover === item.id ? '600' : '400' }}>
                      {item.name}
                    </motion.p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <AnimatePresence>
          <div className="grid gap-3 grid-col-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr ">
            {products.caseDesign.map((item) => {
              return <ProductCard key={item.id} singleProduct={item} device={products.name} />;
            })}
          </div>
        </AnimatePresence>
      </Container>
    </Layout>
  );
};

export default DeviceShop;
