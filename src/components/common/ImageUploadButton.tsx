import { useRef, useState } from 'react';
import * as S from './ImageUploadButton.style';

interface ImageUploadButtonProps {
  width: number;
  height: number;
  backgroundImage: string;
  backgroundColor?: string;
  handleUploadImage: (file: File) => void;
}

export const ImageUploadButton = ({
  width,
  height,
  backgroundColor,
  backgroundImage,
  handleUploadImage,
}: ImageUploadButtonProps) => {
  const [imageFile, setImageFile] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const handleUploadImageChange = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = () => {
        setImageFile(reader.result as string);
      };

      handleUploadImage(file);
    }
  };

  const handleButtonClick = () => {
    imgRef.current?.click();
  };

  return (
    <S.ImageUploadButtonLabel
      $width={width}
      $height={height}
      $backgroundColor={backgroundColor}
      onClick={handleButtonClick}
    >
      <S.Img src={imageFile || backgroundImage} alt="upload" />
      <S.ImageInput type="file" accept="image/*" onChange={handleUploadImageChange} ref={imgRef} />
    </S.ImageUploadButtonLabel>
  );
};
