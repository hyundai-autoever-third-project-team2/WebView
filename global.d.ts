import { AndroidInterface, KakaoInterface } from 'types/Android';

declare global {
  interface Window {
    Android: AndroidInterface;
    Kakao: KakaoInterface;
    // receiveImageFromCamera: (base64Image: string) => void;
    [key: `receiveImageFromCamera${number}`]: (base64Image: string) => void;
    log: <T>(message: T) => void;
    receiveImageFromGallery?: (imageData: string) => void;
  }
  const log: <T>(message: T) => void;
  const Android: AndroidInterface;
  const Kakao: KakaoInterface;
}
