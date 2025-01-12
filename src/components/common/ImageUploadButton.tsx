import { useRef, useState } from 'react';
import * as S from './ImagUploadButton.style';

interface ImageUploadButtonProps {
  width: number;
  height: number;
  backgroundImage: string;
  backgroundColor?: string;
}

export const ImageUploadButton = ({ width, height, backgroundColor, backgroundImage }: ImageUploadButtonProps) => {
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
    }
  };

  return (
    <S.ImageUploadButtonLabel $width={width} $height={height} $backgroundColor={backgroundColor}>
      <S.Img src={imageFile || backgroundImage} alt="upload" />
      <S.ImageInput type="file" accept="image/*" onChange={handleUploadImageChange} ref={imgRef} />
    </S.ImageUploadButtonLabel>
  );
};
