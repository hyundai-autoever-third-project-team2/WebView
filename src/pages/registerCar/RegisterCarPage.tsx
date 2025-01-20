import Toolbar from 'components/common/Toolbar';
import { CarNumber } from './CarNumber';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarImages } from './CarImages';
import { CarIntroduction } from './CarIntroduction';
import { firstStepValidation, secondStepValidation, thirdStepValidation } from './RegisterCarValidation';
import { fetchRegisterCar, IRegisterCarData } from 'api/registerCar/registerCarApi';
import { useModal } from 'hooks/useModal';
import ConfirmModal from 'components/common/ConfirmModal';

function RegisterCarPage() {
  const [step, setStep] = useState(0);
  const [registerCarData, setRegisterCarData] = useState<IRegisterCarData>({
    car_number: '',
    comments: '',
    images: [],
  });
  const navigate = useNavigate();
  const { closeModal, openModal, isModalOpen } = useModal();
  const [modlaDescription, setModalDescription] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  const handleBackClick = () => {
    if (step === 0) {
      navigate(-1);
      return;
    }

    setStep(step - 1);
  };

  const handleModalOpen = (title: string, description: string) => {
    openModal();
    setModalTitle(title);
    setModalDescription(description);
  };

  const handleNextClick = async (data: string | string[]) => {
    switch (step) {
      case 0:
        if (!firstStepValidation(data)) {
          handleModalOpen('차량번호를 정확히 입력해주세요.', '');
          return;
        }
        setRegisterCarData({ ...registerCarData, car_number: data as string });
        break;
      case 1:
      case 2:
        if (!secondStepValidation(data)) {
          handleModalOpen('사진을 4장 등록해주세요.', '');
          return;
        }
        const newCarImages = registerCarData['images'].concat(data as string[]);
        setRegisterCarData({ ...registerCarData, images: newCarImages });
        break;
      case 3:
        if (!thirdStepValidation(data)) {
          handleModalOpen('차량 설명을 입력해주세요.', '');
          return;
        }

        try {
          await fetchRegisterCar({ ...registerCarData, comments: data as string });
          handleModalOpen('차량 등록이 완료되었습니다.', '빠르게 검토하여 등록여부를 알려드리겠습니다.');
        } catch (error) {
          handleModalOpen('차량 등록에 실패했습니다', '다시 시도해주세요.');
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
      {isModalOpen && (
        <ConfirmModal
          title={modalTitle}
          description={modlaDescription}
          isOpen={true}
          onClose={closeModal}
          cancelButton={false}
          onConfirm={modalTitle === '차량 등록이 완료되었습니다.' ? () => navigate('/') : closeModal}
        />
      )}
    </>
  );
}

export default RegisterCarPage;
