export const convertToHttps = (url: string): string => {
  // URL이 비어있거나 undefined인 경우 빈 문자열 반환
  if (!url) return '';

  // 이미 https인 경우 그대로 반환
  if (url.startsWith('https://')) return url;

  // http:// 로 시작하는 경우 https://로 변환
  if (url.startsWith('http://')) {
    return `https://${url.slice(7)}`;
  }

  // 그 외의 경우 https:// 붙여서 반환
  return `https://${url}`;
};
