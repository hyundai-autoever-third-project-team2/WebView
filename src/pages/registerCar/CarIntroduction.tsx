import Button from 'components/common/Button';
import * as S from './RegisterCarPage.style';
import { useState } from 'react';

interface CarIntroductionProps {
  handleNextClick: (data: string | File[]) => void;
}

export const CarIntroduction = ({ handleNextClick }: CarIntroductionProps) => {
  const [carIntroduction, setCarIntroduction] = useState('');

  const handleCarIntroductionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCarIntroduction(e.target.value);
  };

  return (
    <S.CarInsideImagesWrapper>
      <S.TitleWrapper>
        <S.Title>차량에 대한 소개를 작성해주세요</S.Title>
        <S.TextArea value={carIntroduction} onChange={handleCarIntroductionChange} />
      </S.TitleWrapper>
      <Button fixed onClick={() => handleNextClick('')}>
        완료
      </Button>
    </S.CarInsideImagesWrapper>
  );
};
