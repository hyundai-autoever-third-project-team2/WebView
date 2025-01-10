import { AndroidInterface } from 'types/android';

declare global {
  interface Window {
    Android: AndroidInterface;
    log: <T>(message: T) => void;
  }
  const log: <T>(message: T) => void;
  const Android: AndroidInterface;
}
