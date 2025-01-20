import Checkbox from 'components/common/CheckBox';
import * as S from './SelectComparePage.style';
import { useEffect, useState } from 'react';
import { CarListItemData } from 'types/CarListItemData';
import { fetchViewIsHeartCarList } from 'api/mypage/mypageApi';
import { getViewComparesCar } from 'api/carCompare/carCompareApi';
import { CarComparisonData } from 'types/CarDetail';

interface ISelectCarListProps {
  title: string;
  selectedCars: number[];
  handleSelectedButtonClick: (id: number) => void;
}

type ICarList = CarListItemData[] | CarComparisonData[];

export const SelectCarList = ({ title, selectedCars, handleSelectedButtonClick }: ISelectCarListProps) => {
  const selectedCarSet = new Set(selectedCars);
  const [carList, setCarList] = useState<ICarList>([]);

  useEffect(() => {
    if (title === '찜한상품') {
      (async () => {
        const responseCarList = await fetchViewIsHeartCarList();
        setCarList(responseCarList);
      })();
    } else {
      (async () => {
        const recentCarList = localStorage.getItem('recentCarList');
        console.log(recentCarList ? JSON.parse(recentCarList) : []);
        const responseCarList = await getViewComparesCar(recentCarList ? JSON.parse(recentCarList) : []);
        setCarList(responseCarList);
      })();
    }
  }, [title]);

  const isCarListItemData = (car: CarListItemData | CarComparisonData): car is CarListItemData => {
    return 'imageUrl' in car;
  };

  return (
    <S.SelectCarListWrapper>
      <S.Title>{title}</S.Title>
      <S.CarListContainer>
        {carList.map((car) => (
          <S.CarListWrapper
            key={car.carId}
            $isSelected={selectedCarSet.has(car.carId)}
            onClick={() => handleSelectedButtonClick(car.carId)}
          >
            <S.CarImageWrapper>
              <S.CarImage src={isCarListItemData(car) ? car.imageUrl : car.carImages[0]} alt="car" />
              <S.CheckboxWrapper>
                <Checkbox
                  onChange={() => handleSelectedButtonClick(car.carId)}
                  checked={selectedCarSet.has(car.carId)}
                />
              </S.CheckboxWrapper>
            </S.CarImageWrapper>
            <S.CarInfoWrapper>
              <S.CarTitle>{car.model_name}</S.CarTitle>
              <S.CarInfo>
                <S.CarInfo>{car.model_year}</S.CarInfo>
                <S.CarInfo>{car.distance}km</S.CarInfo>
                <S.TagWrapper>
                  <S.HashTagContainer>
                    <S.HashTag>프리미엄</S.HashTag>
                    <S.HashTag>인증</S.HashTag>
                  </S.HashTagContainer>
                </S.TagWrapper>
                <S.Price>
                  {car.discount_price === 0 ? car.price.toLocaleString() : car.discount_price.toLocaleString()}만원
                </S.Price>
              </S.CarInfo>
            </S.CarInfoWrapper>
          </S.CarListWrapper>
        ))}
      </S.CarListContainer>
    </S.SelectCarListWrapper>
  );
};
