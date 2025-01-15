import styled from 'styled-components';
import { theme } from 'styles/theme';

export const CarNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  padding-top: 84px;
  gap: 1px;
`;

export const CarOutsieImagesWrapper = styled(CarNumberWrapper)``;

export const CarInsideImagesWrapper = styled(CarNumberWrapper)``;

export const CarIntroduceWrapper = styled(CarNumberWrapper)``;

export const ImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 140px);
  grid-gap: 16px;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  color: ${theme.colors.neutral900};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.25px;
  margin-bottom: 8px;
  align-self: flex-start;
`;

export const SubTitle = styled.div`
  color: ${theme.colors.neutral500};
  text-align: center;
  font-family: 'Pretendard';
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 140px;
  flex-shrink: 0;
  border-radius: 4px;
  border: solid #ff9d00;
  border-width: 1px;
  background: #fff;
  resize: none;
  padding: 12px;
  font-family: Pretendard;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-width: 2px;
    border-color: ${theme.colors.primary};
    outline: none;
  }
`;

export const Input = styled.input`
  width: 96%;
  height: 53px;
  padding: 10px 12px;
  color: ${theme.colors.primary};
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  border-radius: 9.464px;
  border: 1px solid ${theme.colors.primary};

  &::placeholder {
    color: #ffdda6;
  }

  &:focus {
    border: 2px solid ${theme.colors.primary};
    outline: none;
  }
`;
