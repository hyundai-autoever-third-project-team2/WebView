import * as S from './HomePage.style';
import Logo from '../../assets/logo_small.png';
import { useNavigate } from 'react-router-dom';
import SearchInput from 'components/common/SearchInput';
import { BadgeCheck, ChevronRight } from 'lucide-react';
import CarList from '../../mocks/carList';
import CarData from 'types/CarData';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Profile from 'components/common/Profile';
import RedCar from 'assets/car_red.png';
import GreenCar from 'assets/car_green.png';
import Discount from 'assets/discount.png';
import Podium from 'assets/podium.png';
import Advertisement1 from 'assets/advertisement1.png';
import Advertisement2 from 'assets/advertisement2.png';
import Advertisement3 from 'assets/advertisement3.png';
import Advertisement4 from 'assets/advertisement4.png';
import { useEffect, useLayoutEffect, useState } from 'react';
import { CarListItemData } from 'types/CarListItemData';
import { fetchRecentCarList } from 'api/carList/carListApi';
import CarListItem from 'components/common/CarListItem';
import { ModalPortal } from 'components/common/Modal/ModalPortal';
import { SurveyModal } from 'components/common/Modal/SurveyModal';
import { useModal } from 'hooks/useModal';
import Loading from 'components/common/Loading';
import { getFeedList } from 'api/feed/feedApi';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recentCarList, setRecentCarList] = useState<CarListItemData[]>([]);
  const [feedPreviewList, setFeedPreviewList] = useState<string[]>([]);
  const [recentCarListError, setRecentCarListError] = useState<string | null>(null);
  const [feedPreviewListError, setFeedPreviewListError] = useState<string | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const recommendCarList: CarData[] = [...CarList];

  const advertisementList: { imageUrl: string; title: string }[] = [
    {
      imageUrl: Advertisement1,
      title: '광고1',
    },
    {
      imageUrl: Advertisement2,
      title: '광고2',
    },
    {
      imageUrl: Advertisement3,
      title: '광고3',
    },
    {
      imageUrl: Advertisement4,
      title: '광고4',
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem('newUser')) {
      openModal();
      localStorage.setItem('newUser', 'true');
    }
  }, []);

  useLayoutEffect(() => {
    async function loadRecentCars() {
      try {
        setLoading(true);
        const recentCarList = await fetchRecentCarList();
        setRecentCarList(recentCarList.slice(0, 3));
      } catch (error) {
        console.error('Failed to load recent cars:', error);
        setRecentCarListError('차량을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    loadRecentCars();
  }, []);

  useLayoutEffect(() => {
    async function loadRecentCars() {
      try {
        setLoading(true);
        const feedList = await getFeedList();
        const feedImages = feedList
          .flatMap((user) => user.stories)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3)
          .map((story) => story.imageUrl);

        setFeedPreviewList(feedImages);
      } catch (error) {
        console.error('Failed to load feed:', error);
        setFeedPreviewListError('피드를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    loadRecentCars();
  }, []);

  function handleNotificationButtonClick() {
    navigate('/notification');
  }

  function handleCarListButtonClick(type: string) {
    switch (type) {
      case 'DOMESTIC':
        navigate('/car-list/domestic');
        break;
      case 'FOREIGN':
        navigate('/car-list/foreign');
        break;
      case 'DISCOUNT':
        navigate('/car-list/discount');
        break;
      case 'TOP_50':
        navigate('/car-list/top50');
        break;
      default:
        navigate('/car-list');
    }
  }

  function handleAllCarListClick() {
    // navigate('/car-list');
  }

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
          <S.IconWrapper onClick={() => handleCarListButtonClick('DOMESTIC')}>
            <S.IconInnerWrapper>
              <img src={RedCar} />
              <span>국산차</span>
            </S.IconInnerWrapper>
          </S.IconWrapper>
          <S.IconWrapper onClick={() => handleCarListButtonClick('FOREIGN')}>
            <S.IconInnerWrapper>
              <img src={GreenCar} />
              <span>수입차</span>
            </S.IconInnerWrapper>
          </S.IconWrapper>
          <S.IconWrapper onClick={() => handleCarListButtonClick('DISCOUNT')}>
            <S.IconInnerWrapper>
              <img src={Discount} />
              <span>특가</span>
            </S.IconInnerWrapper>
          </S.IconWrapper>
          <S.IconWrapper onClick={() => handleCarListButtonClick('TOP_50')}>
            <S.IconInnerWrapper>
              <img src={Podium} />
              <span>TOP50</span>
            </S.IconInnerWrapper>
          </S.IconWrapper>
        </S.IconSection>

        <S.StyledAdSwiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          className="mySwiper"
        >
          {advertisementList.map((ad) => (
            <SwiperSlide key={ad.title}>
              <S.AdSection>
                <S.Advertisement src={ad.imageUrl} alt={ad.title} />
              </S.AdSection>
            </SwiperSlide>
          ))}
        </S.StyledAdSwiper>

        <S.RecommendationSection>
          <h3>회원님을 위한</h3>
          <S.RecommendationSubTitle>
            실시간 Matching
            <BadgeCheck size={16} />
          </S.RecommendationSubTitle>

          <S.StyledSwiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000 }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            className="mySwiper"
          >
            {recommendCarList.slice(0, 9).map((car) => (
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
          <S.TitleWithArrowButton>내 차 타볼카?</S.TitleWithArrowButton>
          {loading ? (
            <Loading />
          ) : recentCarListError ? (
            <S.ErrorMessage>{recentCarListError}</S.ErrorMessage>
          ) : recentCarList.length === 0 ? (
            <S.EmptyMessage>등록된 차량이 없습니다.</S.EmptyMessage>
          ) : (
            recentCarList.map((car) => <CarListItem key={car.carId} data={car} />)
          )}
          <S.AllCarListButton onClick={handleAllCarListClick}>
            차량 전체 보기
            <ChevronRight />
          </S.AllCarListButton>
        </S.CarListSection>

        <S.FeedPreviewSection>
          <S.TitleWithArrowButton>
            오늘의 타볼카
            <ChevronRight size={16} onClick={() => navigate('/feed')} />
          </S.TitleWithArrowButton>
          <S.FeedPreviewCardWrapper>
            {feedPreviewList.map((imageUrl, index) => (
              <S.FeedPreviewCard key={index} src={imageUrl} alt={`피드 이미지 ${index + 1}`} />
            ))}
          </S.FeedPreviewCardWrapper>
        </S.FeedPreviewSection>
      </S.HomePageContainer>

      <S.AnnouncementSection>
        <span>공지</span>
        타볼카 1.0.0 출시
      </S.AnnouncementSection>
      {isModalOpen && (
        <ModalPortal>
          <SurveyModal closeModal={closeModal} />
        </ModalPortal>
      )}
    </>
  );
}

export default HomePage;
