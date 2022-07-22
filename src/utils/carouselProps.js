import { GrPrevious, GrNext } from 'react-icons/gr';

export const carouselProperties = {
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
