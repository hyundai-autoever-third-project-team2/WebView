/**
 * 게시글 작성 시간을 받아와서 현재 시간과 비교하여 경과 시간을 반환하는 함수
 * @param createdAt 게시글 작성 시간
 * @returns 경과 시간
 */
export const getElapsedTime = (createdAt: string): string => {
  const created = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - created.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  return `${minutes}분 전`;
};
