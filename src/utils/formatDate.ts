/**
 * 날짜 객체를 year.month.day 형태의 날짜 문자열로 변환합니다.
 * @param date - 날짜 객체
 * @returns year.month.day 형태의 날짜 문자열
 */
export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };