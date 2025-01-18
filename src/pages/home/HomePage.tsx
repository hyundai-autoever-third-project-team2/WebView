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
import { useUser } from 'hooks/useUser';
import Skeleton from 'components/common/Skeleton/Skeleton';

function HomePage() {
  const { data: userInfo } = useUser();
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
        const feedImages = (feedList || [])
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

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?searchCar=${encodeURIComponent(value.trim())}`);
    } else {
      navigate('/search');
    }
  };

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
    navigate('/car-list/top50');
  }

  const CarListSkeleton = () => (
    <>
      {Array.from({ length: 3 }, (_, index) => (
        <S.CarListItemWrapper key={index}>
          {/* 차량 이미지 영역 */}
          <Skeleton width="130px" height="100px" borderRadius="8px" animation="pulse" />
          {/* 차량 정보 영역 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '4px',
              gap: '8px',
              flex: 1,
            }}
          >
            {/* 모델명 */}
            <Skeleton.Text width="80%" height="20px" style={{ background: '#f8f8f8' }} animation="pulse" />

            {/* 연식 및 주행거리 */}
            <Skeleton.Text width="60%" height="16px" style={{ background: '#f8f8f8' }} animation="pulse" />

            {/* 가격 정보 */}
            <Skeleton.Text width="70%" height="20px" style={{ background: '#f8f8f8' }} animation="pulse" />

            {/* 등록일 및 조회수 */}
            <Skeleton.Text width="40%" height="14px" style={{ background: '#f8f8f8' }} animation="pulse" />
          </div>
        </S.CarListItemWrapper>
      ))}
    </>
  );

  return (
    <>
      <S.Header>
        <S.Logo src={Logo} alt="타볼카 로고" />
        <S.HeaderInnerWrapper>
          <S.NotificationButton onClick={handleNotificationButtonClick} />
          <Profile src={userInfo?.profileImage || 'default_profile_image_url'} />
        </S.HeaderInnerWrapper>
      </S.Header>

      <S.HomePageContainer>
        <SearchInput onSearch={handleSearch} />
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
          <h3>{userInfo?.nickname}님을 위한</h3>
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
            <CarListSkeleton />
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
          {feedPreviewListError ? (
            <S.ErrorMessage>{feedPreviewListError}</S.ErrorMessage>
          ) : feedPreviewList.length === 0 ? (
            <S.EmptyMessage>피드가 없습니다.</S.EmptyMessage>
          ) : (
            <S.FeedPreviewCardWrapper onClick={() => navigate('/feed')}>
              {feedPreviewList.map((imageUrl, index) => (
                <S.FeedPreviewCard key={index} src={imageUrl} alt={`피드 이미지 ${index + 1}`} />
              ))}
            </S.FeedPreviewCardWrapper>
          )}
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
