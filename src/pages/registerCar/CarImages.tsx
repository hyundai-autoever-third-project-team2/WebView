import Button from 'components/common/Button';
import * as S from './RegisterCarPage.style';
import { ImageUploadButton } from 'components/common/ImageUploadButton';
import carFront from 'assets/car_front.png';
import carRear from 'assets/car_rear.png';
import carLeft from 'assets/car_left.png';
import carRight from 'assets/car_right.png';
import carInside from 'assets/car_inside.png';
import { useState } from 'react';

interface CarImagesProps {
  imageType: 'outside' | 'inside';
  handleNextClick: (data: string | File[]) => void;
}

export const CarImages = ({ imageType, handleNextClick }: CarImagesProps) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  const handleUploadImage = (file: File) => {
    setUploadFiles([...uploadFiles, file]);
  };

  const renderImageUploadButton = (images: string[]) => {
    return images.map((image, index) => (
      <ImageUploadButton
        key={index}
        width={140}
        height={140}
        backgroundImage={image}
        handleUploadImage={handleUploadImage}
      />
    ));
  };

  const outsideImages = [carFront, carRear, carLeft, carRight];
  const insideImages = Array(4).fill(carInside);
  return (
    <S.CarInsideImagesWrapper>
      <S.TitleWrapper>
        <S.Title>차량사진을 등록해주세요</S.Title>
        <S.SubTitle>차량의 외부와 내부를 가이드에 맞춰 촬영해주세요.</S.SubTitle>
        <S.SubTitle>사진 전송 후에는 수정할 수 없습니다.</S.SubTitle>
      </S.TitleWrapper>

      <S.TitleWrapper>
        <S.Title>{imageType === 'outside' ? '외부(필수)' : '내부(최대4장)'}</S.Title>
      </S.TitleWrapper>
      <S.ImagesWrapper>
        {imageType === 'outside' ? renderImageUploadButton(outsideImages) : renderImageUploadButton(insideImages)}
      </S.ImagesWrapper>
      <Button fixed onClick={() => handleNextClick(uploadFiles)}>
        다음
      </Button>
    </S.CarInsideImagesWrapper>
  );
};
