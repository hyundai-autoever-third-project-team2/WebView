/**
 * log를 출력합니다.
 * @param message - 출력할 메시지
 */
export function initializeLog() {
  window.log = <T>(message: T) => {
    console.log(message);
  };
}