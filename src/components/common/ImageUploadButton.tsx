import { useEffect, useRef, useState } from 'react';
import * as S from './ImageUploadButton.style';
import { fetchUploadImage } from 'api/registerCar/registerCarApi';

interface ImageUploadButtonProps {
  index: number;
  width: number;
  height: number;
  backgroundImage: string;
  backgroundColor?: string;
  handleUploadImage: (imageUrl: string) => void;
}

export const ImageUploadButton = ({
  index,
  width,
  height,
  backgroundColor,
  backgroundImage,
  handleUploadImage,
}: ImageUploadButtonProps) => {
  const [imageFile, setImageFile] = useState('');
  // const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const functionName = `receiveImageFromCamera${index}`;

    (window as any)[functionName] = async (base64Image: string) => {
      console.log(`Received image from camera for button ${index}:`, base64Image.substring(0, 50) + '...');
      setImageFile(base64Image);
      try {
        const [header, base64] = base64Image.split(',');
        const mimeType = header.match(/:(.*?);/)?.[1];
        if (!mimeType) throw new Error('Failed to extract MIME type');

        const byteString = atob(base64);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: mimeType });
        const file = new File([blob], `image.${mimeType.split('/')[1]}`, { type: mimeType });

        const formData = new FormData();
        formData.append('image', file);
        const imageUrl = await fetchUploadImage(formData).then((res) => res.data);
        handleUploadImage(imageUrl);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    };

    return () => {
      delete (window as any)[functionName];
    };
  }, [handleUploadImage, index]);

  /* 로컬 테스트용 코드 */
  // const handleUploadImageChange = async () => {
  //   const file = imgRef.current?.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file as Blob);
  //     reader.onload = () => {
  //       setImageFile(reader.result as string);
  //     };

  //     const formData = new FormData();
  //     formData.append('image', file);
  //     const imageUrl = await fetchUploadImage(formData).then((res) => res.data);
  //     handleUploadImage(imageUrl);
  //   }
  // };

  const handleImageUploadButtonClick = () => {
    if (!!Android) {
      Android.openCamera(index);
    }
  };

  return (
    <S.ImageUploadButtonLabel
      $width={width}
      $height={height}
      $backgroundColor={backgroundColor}
      onClick={handleImageUploadButtonClick}
    >
      <S.Img src={imageFile || backgroundImage} alt="upload" />
      {/* <S.ImageInput type="file" accept="image/*" onChange={handleUploadImageChange} ref={imgRef} /> */}
    </S.ImageUploadButtonLabel>
  );
};
