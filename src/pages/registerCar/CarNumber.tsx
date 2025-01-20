import Button from 'components/common/Button';
import * as S from './RegisterCarPage.style';
import { useState } from 'react';
import { FadeUpAnimationWrapper } from 'styles/fadeUpAnimationWrapper';

interface CarNumberProps {
  handleNextClick: (data: string | string[]) => void;
}

export const CarNumber = ({ handleNextClick }: CarNumberProps) => {
  const [carNumber, setCarNumber] = useState('');

  const handleCarNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(e.target.value);
  };

  return (
    <S.CarNumberWrapper>
      <FadeUpAnimationWrapper>
        <S.Title>차량번호를 입력해주세요</S.Title>
        <S.Input placeholder="123가1234" value={carNumber} onChange={handleCarNumberChange} />
      </FadeUpAnimationWrapper>

      <Button $fixed onClick={() => handleNextClick(carNumber)}>
        다음
      </Button>
    </S.CarNumberWrapper>
  );
};
