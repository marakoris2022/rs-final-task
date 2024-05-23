import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.scss';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export const Carousel = ({ images }: { images: Array<string> }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${index}_carousel_image`}>
            <img src={image} alt="img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
