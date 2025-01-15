import Checkbox from 'components/common/CheckBox';
import * as S from './SelectComparePage.style';

interface ISelectCarListProps {
  title: string;
  selectedCars: number[];
  handleSelectedButtonClick: (id: number) => void;
}

export const SelectCarList = ({ title, selectedCars, handleSelectedButtonClick }: ISelectCarListProps) => {
  const selectedCarSet = new Set(selectedCars);
  return (
    <S.SelectCarListWrapper>
      <S.Title>{title}</S.Title>
      <S.CarListContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <S.CarListWrapper key={index}>
            <S.CarImageWrapper>
              <S.CarImage
                src="https://imgsc.chutcha.kr/files/car_resist/202412/29/2024122911065817354380182231_ori.jpg?s=480x360&t=crop"
                alt="car"
              />
              <S.CheckboxWrapper>
                <Checkbox onChange={() => handleSelectedButtonClick(index)} checked={selectedCarSet.has(index)} />
              </S.CheckboxWrapper>
            </S.CarImageWrapper>
            <S.CarInfoWrapper>
              <S.CarTitle>2023 그랜저(IG) 하이브리드 르블랑</S.CarTitle>
              <S.CarInfo>
                <S.CarInfo>2021년 12월 (20년형)</S.CarInfo>
                <S.CarInfo>55,430km</S.CarInfo>
                <S.TagWrapper>
                  <S.HashTagContainer>
                    <S.HashTag>무사고</S.HashTag>
                    <S.HashTag>인증</S.HashTag>
                  </S.HashTagContainer>
                </S.TagWrapper>
                <S.Price>3,100만원</S.Price>
              </S.CarInfo>
            </S.CarInfoWrapper>
          </S.CarListWrapper>
        ))}
      </S.CarListContainer>
    </S.SelectCarListWrapper>
  );
};
