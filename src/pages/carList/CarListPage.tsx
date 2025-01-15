import { useNavigate, useParams } from 'react-router-dom';
import Toolbar from 'components/common/Toolbar';
import * as S from './CarListPage.style';
import { useEffect } from 'react';
import CarListItem from 'components/common/CarListItem';
import mockCarListItem from 'mocks/carListItem';

const enum CarListPageType {
  DOMESTIC = 'domestic',
  FOREIGN = 'foreign',
  DISCOUNT = 'discount',
  TOP_50 = 'top50',
}

const mockApiResponse = mockCarListItem;

function fetchCarListByType(type: CarListPageType) {
  // 차량 목록을 가져오는 비동기 함수
}

function CarListPage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: CarListPageType }>();

  useEffect(() => {
    if (type) {
      fetchCarListByType(type);
    }
  }, [type]);

  const getTitle = () => {
    switch (type) {
      case CarListPageType.DOMESTIC:
        return '국산차';
      case CarListPageType.FOREIGN:
        return '수입차';
      case CarListPageType.DISCOUNT:
        return '특가';
      case CarListPageType.TOP_50:
        return 'TOP 50';
      default:
        return '차량 목록';
    }
  };

  return (
    <>
      <Toolbar title={getTitle()} showBackButton onBackClick={() => navigate(-1)} />
      <S.CarListPageContainer>
        {mockApiResponse.map((car) => (
          <CarListItem key={car.carId} data={car} />
        ))}
      </S.CarListPageContainer>
    </>
  );
}

export default CarListPage;
