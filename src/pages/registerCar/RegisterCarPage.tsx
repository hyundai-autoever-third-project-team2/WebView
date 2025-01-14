import Toolbar from 'components/common/Toolbar';
import { CarNumber } from './CarNumber';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarImages } from './CarImages';
import { CarIntroduction } from './CarIntroduction';

function RegisterCarPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (step === 0) {
      navigate(-1);
      return;
    }

    setStep(step - 1);
  };

  const handleNextClick = (data: string | File[]) => {
    const newFormData = new FormData();
    formData.forEach((value, key) => {
      newFormData.append(key, value);
    });

    // TODO: validate data
    switch (step) {
      case 0:
        newFormData.append('carNumber', data as string);
        break;
      case 1:
      case 2:
        if (Array.isArray(data)) {
          data.forEach((file) => newFormData.append('carImage', file));
        }
        break;
      case 3:
        newFormData.append('introduction', data as string);
        // TODO: 차량등록 API 호출
        return;
    }

    setFormData(newFormData);
    setStep(step + 1);
  };

  return (
    <>
      <Toolbar showBackButton title="차량 판매" titleAlignment="center" onBackClick={handleBackClick} />
      {step === 0 && <CarNumber handleNextClick={handleNextClick} />}
      {step === 1 && <CarImages imageType="outside" handleNextClick={handleNextClick} />}
      {step === 2 && <CarImages imageType="inside" handleNextClick={handleNextClick} />}
      {step === 3 && <CarIntroduction handleNextClick={handleNextClick} />}
    </>
  );
}

export default RegisterCarPage;
