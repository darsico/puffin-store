import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';
import { useStore } from '../../store';
import Image from 'next/image';
import ProductSingleImage from '../Product/ProductSingleImage';

const Carousel = () => {
  const variantOption = useStore((state) => state.variantOption);

  const { productImages } = variantOption;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {productImages.length > 1 ? (
        <div className="carousel">
          <Swiper
            style={{
              '--swiper-navigation-color': '#000',
              '--swiper-pagination-color': '#fff',
              '--swiper-navigation-size': '25px',
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {productImages?.map((item, index) => {
              return (
                <SwiperSlide key={index} className="">
                  <div className="h-96 hover:cursor-pointer">
                    <figure style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <Image src={item} alt={`Foto de producto`} className="object-cover object-center w-full h-full rounded-lg " layout="fill" objectFit="contain" priority />
                    </figure>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={3} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
            {productImages?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="h-24 hover:cursor-pointer">
                    <figure style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <Image src={item} alt={`Foto de producto`} className="object-cover object-center w-full h-full rounded-lg " layout="fill" objectFit="contain" priority />
                    </figure>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <ProductSingleImage item={productImages[0]} />
      )}
    </>
  );
};

export default Carousel;
