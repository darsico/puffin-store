import Layout from '../../src/components/layout/Layout';
import ProductCard from '../../src/components/Products/ProductCard';
import Container from '../../src/components/UI/Container';
import { GET_ALL_DEVICES, GET_SINGLE_DEVICE } from '../../src/data/queryDevice';
import { queryClient } from '../../src/hooks/queryClient';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { carouselProperties } from '../../src/utils/carouselProps';
import { useStore } from '../../src/store';

export const getStaticPaths = async () => {
  const { data } = await queryClient(GET_ALL_DEVICES);
  const paths = data.queryDeviceModel.map((item) => ({ params: { device: item.name.toLowerCase().replace(/\s/g, '-') } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { device } = params;
  const { data: allDevices } = await queryClient(GET_ALL_DEVICES);
  const models = allDevices.queryDeviceModel.map((item) => ({ ...item, slug: item.name.toLowerCase().replace(/\s/g, '-') }));
  const deviceModelFound = models.find((item) => item.slug === device);
  const VARIABLES = { id: deviceModelFound.id };
  const { data } = await queryClient(GET_SINGLE_DEVICE, VARIABLES);
  return {
    props: {
      deviceModel: data.getDeviceModel,
      allDevices: models,
    },
  };
};

const DeviceShop = ({ deviceModel, allDevices }) => {
  const { setProductItemsByDevice, productItemsByDevice } = useStore((state) => state);
  const [isHover, setIsHover] = useState(null);
  const router = useRouter();

  const handleDeviceFilterClick = (slug) => {
    router.push({ pathname: `/devices/${slug}`, query: { device: slug } }, undefined, { shallow: false });
  };
  const caseDesignModels = deviceModel.caseDesign.map((item) => ({ ...item, initialVariant: item.variants[0] }));

  useEffect(() => {
    setProductItemsByDevice(caseDesignModels);
  }, [router.query.device]);

  return (
    <Layout>
      <Container>
        <h1 className="pt-10 text-2xl leading-6 ">
          Explora nuestros modelos en <span className="font-bold">{deviceModel?.name}</span>
        </h1>
        <div className="py-10">
          <Slider {...carouselProperties}>
            {allDevices.map((item) => {
              return (
                <div className="flex items-center justify-center hover:cursor-pointer" onMouseEnter={() => setIsHover(item.id)} onMouseLeave={() => setIsHover(null)} onClick={() => handleDeviceFilterClick(item.slug)} key={item.id}>
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
          <div className="grid md:gap-3 gap-8  grid-col-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr  ">
            {deviceModel.caseDesign.map((item) => {
              return <ProductCard key={item.id} singleProduct={item} device={deviceModel.name} />;
            })}
          </div>
        </AnimatePresence>
      </Container>
    </Layout>
  );
};

export default DeviceShop;
