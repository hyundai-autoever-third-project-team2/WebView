import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import carList from 'mocks/carList';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
`;

const CustomSwiper = styled(Swiper)`
  .swiper-pagination {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 10;
    color: #fff;
    font-size: 14px;
    background-color: rgba(174, 166, 169, 0.7);
    padding: 5px 10px;
    border-radius: 5px;
  }
`;

export const CarDetailSwiper = () => {
  const carImages = carList[0].imageUrlList;
  return (
    <CustomSwiper
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true, type: 'fraction' }}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
    >
      {carImages.map((imageUrl) => (
        <SwiperSlide key={imageUrl}>
          <Img src={imageUrl} alt="car" />
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
};
