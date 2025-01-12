import { AndroidInterface, KakaoInterface } from 'types/android';

declare global {
  interface Window {
    Android: AndroidInterface;
    Kakao: KakaoInterface;
    log: <T>(message: T) => void;
  }
  const log: <T>(message: T) => void;
  const Android: AndroidInterface;
  const Kakao: KakaoInterface;
}
