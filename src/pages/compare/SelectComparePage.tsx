import Toolbar from 'components/common/Toolbar';
import { SelectCarList } from './SelectCarList';
import * as S from './SelectComparePage.style';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SelectComparePage = () => {
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSelectedButtonClick = (id: number) => {
    if (selectedCars.includes(id)) {
      setSelectedCars(selectedCars.filter((carId) => carId !== id));

      return;
    }
    setSelectedCars([...selectedCars, id]);
  };

  return (
    <>
      <S.SelectComparePageWrapper>
        <Toolbar title="차량비교 선택" onBackClick={handleBackClick} showBackButton />
        <SelectCarList
          title="찜한상품"
          selectedCars={selectedCars}
          handleSelectedButtonClick={handleSelectedButtonClick}
        />
        <SelectCarList
          title="최근본상품"
          selectedCars={selectedCars}
          handleSelectedButtonClick={handleSelectedButtonClick}
        />
      </S.SelectComparePageWrapper>
      <S.CompareButtonWarpper $disabled={selectedCars.length < 2}>
        <S.SelectedCount>
          {selectedCars.length < 2 ? '비교 할 차량을 선택 해주세요' : `${selectedCars.length}대의 차량 비교하기`}
        </S.SelectedCount>
      </S.CompareButtonWarpper>
    </>
  );
};
