import { useEffect, useState } from 'react';
import * as S from './SurveyModal.style';
import Slider from '@mui/material/Slider';
import Button from '../Button';
import { IServeyData } from 'types/Survey';
import { submitSurvey } from 'api/survey/surveyApi';

interface ISurveyProps {
  nextStep: (data?: Partial<IServeyData>) => void;
}

interface ISurveyModal {
  closeModal: () => void;
}

const SurveyIntro = ({ nextStep }: ISurveyProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    '안녕하세요👋',
    `나에게 딱 맞는
    차량 추천을 위해
    몇 가지만 알려주세요!`,
  ];

  useEffect(() => {
    if (messageIndex < messages.length) {
      const timer = setTimeout(() => {
        setMessageIndex((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      nextStep();
    }
  }, [messageIndex]);

  return (
    <S.SurveyIntroWrapper>
      <S.SurveyMessageIntro key={messageIndex}>{messages[messageIndex]}</S.SurveyMessageIntro>
    </S.SurveyIntroWrapper>
  );
};

const QuestionPrice = ({ nextStep }: ISurveyProps) => {
  const [price, setPrice] = useState<number[]>([0, 10000]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  const handleNextButtonClick = () => {
    nextStep({ min_price: price[0], max_price: price[1] });
  };

  return (
    <S.QuestionWrapper>
      <S.SurveyMessage>
        {`차량의 가격은
    어느 정도로
    생각하고 있나요?`}
      </S.SurveyMessage>

      <S.SurveyRangeWrapper>
        <S.SurveyRangeSpan>
          {price[0]}만원 ~ {price[1]}만원
        </S.SurveyRangeSpan>
      </S.SurveyRangeWrapper>

      <S.SliderWrapper>
        <Slider
          step={1000}
          min={0}
          max={10000}
          getAriaLabel={() => 'Price range'}
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
        />
      </S.SliderWrapper>
      <Button onClick={handleNextButtonClick}>다음</Button>
    </S.QuestionWrapper>
  );
};

const QuestionDistance = ({ nextStep }: ISurveyProps) => {
  const [distance, setDistance] = useState<number[]>([0, 300000]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setDistance(newValue as number[]);
  };

  const handleNextButtonClick = () => {
    nextStep({ min_distance: distance[0], max_distance: distance[1] });
  };

  return (
    <S.QuestionWrapper>
      <S.SurveyMessage>
        {`차량의 주행거리는
    어느 정도로
    생각하고 있나요?`}
      </S.SurveyMessage>

      <S.SurveyRangeWrapper>
        <S.SurveyRangeSpan>
          {distance[0]}km ~ {distance[1]}km
        </S.SurveyRangeSpan>
      </S.SurveyRangeWrapper>

      <S.SliderWrapper>
        <Slider
          step={10000}
          min={0}
          max={300000}
          getAriaLabel={() => 'Distance range'}
          value={distance}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
        />
      </S.SliderWrapper>
      <Button onClick={handleNextButtonClick}>다음</Button>
    </S.QuestionWrapper>
  );
};

const carList = [
  {
    brand: '쉐보레',
    model: '스파크',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202412/28/2024122813111917353590797788_ori.jpg?s=480x360&t=crop',
    carId: 136,
  },
  {
    brand: '벤츠',
    model: 'C-클래스 ',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202412/07/2024120715142717335520675826_ori.jpg?s=480x360&t=crop',
    carId: 264,
  },
  {
    brand: '제네시스',
    model: 'G80',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202501/10/2025011017174717364970672743_ori.jpg?s=480x360&t=crop',
    carId: 275,
  },
  {
    brand: '기아',
    model: '쏘렌토',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202412/15/2024121512082217342321025309_ori.jpg?s=480x360&t=crop',
    carId: 283,
  },
  {
    brand: '지프',
    model: '레니게이드',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202412/31/d6bb7efe62eb1adaac285533edd34358_ori.jpg?s=480x360&t=crop',
    carId: 287,
  },
  {
    brand: '랜드로버',
    model: '디스커버리 스포츠',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202501/05/2025010515542417360600642918_ori.jpg?s=480x360&t=crop',
    carId: 350,
  },
  {
    brand: '현대',
    model: '아이오닉5',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202501/03/2025010313431117358793914260_ori.jpg?s=480x360&t=crop',
    carId: 354,
  },
  {
    brand: '테슬라',
    model: '모델3',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202501/06/2025010618524117361571620004_ori.jpg?s=480x360&t=crop',
    carId: 206,
  },
  {
    brand: '현대',
    model: '캐스퍼',
    imageUrl:
      'https://imgsc.chutcha.kr/files/car_resist/202501/13/2025011312324617367391665294_ori.jpg?s=480x360&t=crop',
    carId: 181,
  },
];

const QuestionModel = ({ nextStep }: ISurveyProps) => {
  const [selectedCarIds, setSelectedCarIds] = useState<number[]>([]);

  const handleSelectCar = (carId: number) => {
    if (selectedCarIds.length >= 5 && !selectedCarIds.includes(carId)) return;

    setSelectedCarIds((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      return [...prev, carId];
    });
  };

  const handleNextButtonClick = () => {
    if (selectedCarIds.length !== 5) {
      alert('5개의 차량을 선택해주세요');
      return;
    }

    nextStep({ car_model_ids: selectedCarIds });
  };
  return (
    <S.QuestionWrapperLarge>
      <S.SurveyMessage>
        {`관심가는 차 5개를
         골라주세요`}
      </S.SurveyMessage>

      <S.CarGrid>
        {carList.map((car) => (
          <S.SelectItemWrapper key={car.carId} onClick={() => handleSelectCar(car.carId)}>
            <S.ImageWrapper $isSelected={selectedCarIds.includes(car.carId)}>
              <S.Image src={car.imageUrl} />
            </S.ImageWrapper>
            <S.Text>{car.brand}</S.Text>
            <S.Text>{car.model}</S.Text>
          </S.SelectItemWrapper>
        ))}
      </S.CarGrid>
      <Button $fixed onClick={handleNextButtonClick}>
        다음
      </Button>
    </S.QuestionWrapperLarge>
  );
};

const ColorList2 = [
  { name: '흰색', color: '#F5F5F5', idx: 10 },
  { name: '검정', color: '#1C1C1C', idx: 1 },
  { name: '회색', color: '#808080', idx: 9 },
  { name: '남색', color: '#1C3F6E', idx: 3 },
  { name: '녹색', color: '#004225', idx: 4 },
  { name: '갈색', color: '#433831', idx: 0 },
  { name: '진주', color: '#FDEBD0', idx: 6 },
  { name: '파랑', color: '#2A4B7C', idx: 7 },
  { name: '하늘', color: '#4B8DAD', idx: 8 },
];

const QuestionColor = ({ nextStep }: ISurveyProps) => {
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

  const handleSelectColor = (colorName: number) => {
    if (selectedColors.length >= 3 && !selectedColors.includes(colorName)) return;

    setSelectedColors((prev) => {
      if (prev.includes(colorName)) {
        return prev.filter((name) => name !== colorName);
      }
      return [...prev, colorName];
    });
  };

  const hanleNextButtonClick = () => {
    nextStep({ colors: selectedColors });
  };
  return (
    <S.QuestionWrapperLarge>
      <S.SurveyMessage>
        {`마지막으로
        원하는 색상 3개를
        골라주세요`}
      </S.SurveyMessage>

      <S.CarGrid>
        {ColorList2.map((color) => (
          <S.ImageWrapper key={color.name} onClick={() => handleSelectColor(color.idx)}>
            <S.ColorDiv $color={color.color} $isSelected={selectedColors.includes(color.idx)} />
            <S.Text>{color.name}</S.Text>
          </S.ImageWrapper>
        ))}
      </S.CarGrid>
      <Button $fixed onClick={hanleNextButtonClick}>
        다음
      </Button>
    </S.QuestionWrapperLarge>
  );
};

const SurveyLastPage = ({ handleSubmitSurvey }: { handleSubmitSurvey: () => void }) => {
  return (
    <S.SurveyIntroWrapper>
      <S.SurveyMessage>
        {`이제 타볼카에서
        내게 맞는 차를
        만나러 가볼까요?`}
      </S.SurveyMessage>
      <Button onClick={handleSubmitSurvey}>시작하기</Button>
    </S.SurveyIntroWrapper>
  );
};

export const SurveyModal = ({ closeModal }: ISurveyModal) => {
  const [step, setStep] = useState(0);
  const [surveyData, setSurveyData] = useState<IServeyData | {}>({});

  const handleNextStep = (data?: Partial<IServeyData>) => {
    setStep((prev) => prev + 1);
    setSurveyData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmitSurvey = async () => {
    try {
      await submitSurvey(surveyData);
    } catch {
      alert('설문조사 제출에 실패했습니다.');
    }
    closeModal();
  };

  return (
    <>
      <S.ModalWrapper>
        {step === 0 && <SurveyIntro nextStep={handleNextStep} />}
        {step === 1 && <QuestionPrice nextStep={handleNextStep} />}
        {step === 2 && <QuestionDistance nextStep={handleNextStep} />}
        {step === 3 && <QuestionModel nextStep={handleNextStep} />}
        {step === 4 && <QuestionColor nextStep={handleNextStep} />}
        {step === 5 && <SurveyLastPage handleSubmitSurvey={handleSubmitSurvey} />}
      </S.ModalWrapper>
      <S.ModalOverlay />
    </>
  );
};
