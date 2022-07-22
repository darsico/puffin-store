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

const Carousel = () => {
  const variantOption = useStore((state) => state.variantOption);

  const { productImages } = variantOption;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
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
              <img src={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
        {productImages?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item} style={{ objectFit: 'cover' }} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
