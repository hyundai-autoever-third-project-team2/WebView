import * as S from './HomePage.style';
import Logo from '../../assets/logo_small.png';
import { useNavigate } from 'react-router-dom';
import SearchInput from 'components/common/SearchInput';
import { BadgeCheck, ChevronRight } from 'lucide-react';
import CarList from '../../mocks/carList';
import CarData from 'types/carData';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
import Profile from 'components/common/Profile';
import RedCar from 'assets/car_red.png';
import GreenCar from 'assets/car_green.png';
import Discount from 'assets/discount.png';
import Podium from 'assets/podium.png';

function HomePage() {
  const navigate = useNavigate();

  function handleNotificationButtonClick() {
    navigate('/notification');
  }

  const carList: CarData[] = [...CarList];

  return (
    <>
      <S.Header>
        <S.Logo src={Logo} alt="타볼카 로고" />
        <S.HeaderInnerWrapper>
          <S.NotificationButton onClick={handleNotificationButtonClick} />
          <Profile src="https://as1.ftcdn.net/v2/jpg/00/56/01/00/500_F_56010077_UA98ADMw95rEB2hCuAlFOJkjdirrAAPV.jpg" />
        </S.HeaderInnerWrapper>
      </S.Header>

      <S.HomePageContainer>
        <SearchInput />
        <S.IconSection>
          <S.IconWrapper>
            <S.IconInnerWrapper>
              <img src={RedCar} />
              <span>국산차</span>
            </S.IconInnerWrapper>
          </S.IconWrapper>
          <S.IconWrapper>
            <S.IconInnerWrapper>
              <img src={GreenCar} />
              <span>수입차</span>
            </S.IconInnerWrapper>
          </S.IconWrapper>
          <S.IconWrapper>
            <S.IconInnerWrapper>
              <img src={Discount} />
              <span>특가</span>
            </S.IconInnerWrapper>
          </S.IconWrapper>
          <S.IconWrapper>
            <S.IconInnerWrapper>
              <img src={Podium} />
              <span>TOP50</span>
            </S.IconInnerWrapper>
          </S.IconWrapper>
        </S.IconSection>

        <S.StyledSwiper>
          <SwiperSlide>
            <S.AdSection>광고 배너</S.AdSection>
          </SwiperSlide>
        </S.StyledSwiper>

        <S.RecommendationSection>
          <h3>회원님을 위한</h3>
          <S.RecommendationSubTitle>
            실시간 Matching
            <BadgeCheck size={16} />
          </S.RecommendationSubTitle>

          <S.StyledSwiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            className="mySwiper"
          >
            {carList.slice(0, 9).map((car) => (
              <SwiperSlide key={car.id}>
                <S.RecommendationCarCard>
                  <S.CarCardImage src={car.imageUrlList[0]} alt={car.model} />
                  <S.CarCardInfo>
                    <S.CarName>{car.model}</S.CarName>
                    <S.CarYear>{car.modelYear}</S.CarYear>
                    <p>{car.dist}</p>
                    <p>{car.price}</p>
                  </S.CarCardInfo>
                </S.RecommendationCarCard>
              </SwiperSlide>
            ))}
          </S.StyledSwiper>
        </S.RecommendationSection>

        <S.CarListSection>
          <S.TitleWithArrowButton>
            내 차 타볼카?
            <ChevronRight size={16} />
          </S.TitleWithArrowButton>
          {carList.slice(0, 3).map((car) => (
            <S.CarListCard key={car.id}>
              <S.CarListCardImage src={car.imageUrlList[0]} alt={car.model} />
              <S.CarListCardInfo>
                <S.CarName>{car.model}</S.CarName>
                <S.CarYear>{car.modelYear}</S.CarYear>
                <p>{car.dist}</p>
                <p className="price">{car.price}</p>
              </S.CarListCardInfo>
            </S.CarListCard>
          ))}
          <S.AllCarListButton>
            차량 전체 보기
            <ChevronRight />
          </S.AllCarListButton>
        </S.CarListSection>

        <S.FeedPreviewSection>
          <S.TitleWithArrowButton>
            오늘의 타볼카
            <ChevronRight size={16} />
          </S.TitleWithArrowButton>
          <S.FeedPreviewCardWrapper>
            {carList.slice(3, 6).map((car) => (
              <S.FeedPreviewCard key={car.id} src={car.imageUrlList[0]} alt={car.model} />
            ))}
          </S.FeedPreviewCardWrapper>
        </S.FeedPreviewSection>
      </S.HomePageContainer>

      <S.AnnouncementSection>
        <span>공지</span>
        타볼카 1.0.0 출시
      </S.AnnouncementSection>
    </>
  );
}

export default HomePage;
