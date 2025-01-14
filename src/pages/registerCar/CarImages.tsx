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
  imageType: '외부' | '내부';
  handleNextClick: (data: string | string[]) => void;
}

export const CarImages = ({ imageType, handleNextClick }: CarImagesProps) => {
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);

  const handleUploadImage = (imageUrl: string) => {
    setImageUrlList([...imageUrlList, imageUrl]);
  };

  const renderImageUploadButton = (images: string[]) => {
    return images.map((image, index) => (
      <ImageUploadButton
        index={index}
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
        <S.Title>{imageType}</S.Title>
      </S.TitleWrapper>
      <S.ImagesWrapper>
        {imageType === '외부' ? renderImageUploadButton(outsideImages) : renderImageUploadButton(insideImages)}
      </S.ImagesWrapper>
      <Button fixed onClick={() => handleNextClick(imageUrlList)}>
        다음
      </Button>
    </S.CarInsideImagesWrapper>
  );
};
