import { useNavigate, useParams } from 'react-router-dom';
import Toolbar from 'components/common/Toolbar';
import * as S from './CarListPage.style';
import { useEffect, useState } from 'react';
import CarListItem from 'components/common/CarListItem';
import { CarListItemData } from 'types/CarListItemData';
import { CarListPageType, fetchCarListByType } from 'api/carList/carListApi';
import Loading from 'components/common/Loading';

function CarListPage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: CarListPageType }>();
  const [cars, setCars] = useState<CarListItemData[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (type) {
      setLoading(true);
      fetchCarListByType(type)
        .then((response) => {
          // 응답이 배열인지 확인하고 설정
          setCars(Array.isArray(response) ? response : []);
        })
        .catch((error) => {
          console.error('Error fetching cars:', error);
          setCars([]);
        })
        .finally(() => setLoading(false));
    }
  }, [type]);

  if (loading) {
    return (
      <>
        <Toolbar title={getTitle()} showBackButton onBackClick={() => navigate(-1)} />
        <S.CarListPageContainer>
          <Loading />
        </S.CarListPageContainer>
      </>
    );
  }

  return (
    <>
      <Toolbar title={getTitle()} showBackButton onBackClick={() => navigate(-1)} />
      <S.CarListPageContainer>
        {cars.map((car) => (
          <CarListItem key={car.carId} data={car} />
        ))}
      </S.CarListPageContainer>
    </>
  );
}

export default CarListPage;
