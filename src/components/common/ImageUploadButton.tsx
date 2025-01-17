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
  const imgRef = useRef<HTMLInputElement>(null);

  // 모바일 카메라 관련 코드
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

  // PC 환경 파일 업로드 처리
  const handleUploadImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 이미지 미리보기 설정
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImageFile(reader.result as string);
        };

        // 이미지 업로드 처리
        const formData = new FormData();
        formData.append('image', file);
        const imageUrl = await fetchUploadImage(formData).then((res) => res.data);
        console.log('Uploaded image URL:', imageUrl);
        handleUploadImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleImageUploadButtonClick = () => {
    // Android 객체가 존재하는 경우 (모바일 환경)
    if (typeof Android !== 'undefined' && Android?.openCamera) {
      Android.openCamera(index);
    } else {
      // PC 환경에서는 파일 input 클릭
      imgRef.current?.click();
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
      <S.ImageInput type="file" accept="image/*" onChange={handleUploadImageChange} ref={imgRef} />
    </S.ImageUploadButtonLabel>
  );
};
