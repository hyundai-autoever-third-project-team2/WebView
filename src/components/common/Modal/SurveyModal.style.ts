import styled, { keyframes } from 'styled-components';
import { theme } from 'styles/theme';

export const ModalWrapper = styled.div`
  width: 100%;
  height: auto;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: var(--neutral-900, #0f172a);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 9999;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 9998;
`;

/* 설문조사 인트로 */

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  90%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const SurveyIntroWrapper = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 20px;
`;

export const SurveyMessage = styled.p`
  color: var(--neutral-100, #f1f5f9);
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 600;
  line-height: 42px; /* 62.5% */
  white-space: pre-line;
  text-align: center;
`;

export const SurveyMessageIntro = styled(SurveyMessage)`
  animation: ${fadeInOut} 2.5s ease-in-out forwards;
`;

/* 설문조사 질문 */

export const QuestionWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;
`;

export const QuestionWrapperLarge = styled(QuestionWrapper)`
  height: 640px;
`;

export const SurveyRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const SurveyRangeSpan = styled.span`
  color: #fff;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  letter-spacing: 0.25px;
`;

export const SliderWrapper = styled.div`
  padding: 20px;
`;

export const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const SelectItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const ImageWrapper = styled.div<{ $isSelected?: boolean }>`
  outline: ${({ $isSelected }) => ($isSelected ? `2px solid ${theme.colors.primary}` : 'none')};
  width: auto;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Text = styled.span`
  font-size: 12px;
  color: #fff;
`;

export const ColorDiv = styled.div<{ $color: string; $isSelected?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${({ $color }) => $color};
  border: ${({ $isSelected }) =>
    $isSelected ? `2px solid ${theme.colors.primary}` : '1px solid rgba(62, 56, 96, 0.37);'};
`;
