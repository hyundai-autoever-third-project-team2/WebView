import Toolbar from 'components/common/Toolbar';
import { CarNumber } from './CarNumber';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarImages } from './CarImages';
import { CarIntroduction } from './CarIntroduction';
import { firstStepValidation, secondStepValidation, thirdStepValidation } from './RegisterCarValidation';
import { fetchRegisterCar, IRegisterCarData } from 'api/registerCar/registerCarApi';

function RegisterCarPage() {
  const [step, setStep] = useState(0);
  const [registerCarData, setRegisterCarData] = useState<IRegisterCarData>({
    car_number: '',
    comments: '',
    images: [],
  });
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (step === 0) {
      navigate(-1);
      return;
    }

    setStep(step - 1);
  };

  const handleNextClick = async (data: string | string[]) => {
    console.log('test: ');
    console.log(registerCarData);
    switch (step) {
      case 0:
        if (!firstStepValidation(data)) {
          alert('차량번호를 정확히 입력해주세요.');
          return;
        }
        setRegisterCarData({ ...registerCarData, car_number: data as string });
        break;
      case 1:
      case 2:
        if (!secondStepValidation(data)) {
          alert('사진을 4장 등록해주세요.');
          return;
        }
        const newCarImages = registerCarData['images'].concat(data as string[]);
        setRegisterCarData({ ...registerCarData, images: newCarImages });
        break;
      case 3:
        if (!thirdStepValidation(data)) {
          alert('차량 설명을 입력해주세요.');
          return;
        }

        try {
          await fetchRegisterCar({ ...registerCarData, comments: data as string });
          // TODO: 모달창 완성되면 모달창으로 띄우기
          alert('차량 등록이 완료되었습니다');
          navigate('/');
        } catch (error) {
          alert('차량 등록에 실패했습니다');
        }
        return;
    }

    setStep(step + 1);
  };

  return (
    <>
      <Toolbar showBackButton title="차량 판매" titleAlignment="center" onBackClick={handleBackClick} />
      {step === 0 && <CarNumber handleNextClick={handleNextClick} />}
      {step === 1 && <CarImages imageType="외부" handleNextClick={handleNextClick} />}
      {step === 2 && <CarImages imageType="내부" handleNextClick={handleNextClick} />}
      {step === 3 && <CarIntroduction handleNextClick={handleNextClick} />}
    </>
  );
}

export default RegisterCarPage;
