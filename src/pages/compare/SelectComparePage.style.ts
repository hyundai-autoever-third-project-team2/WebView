import styled from 'styled-components';
import { theme } from 'styles/theme';

export const SelectComparePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 72px;

  & > :last-child {
    padding-top: 24px;
    border-top: 1px solid #e5e5e5;
  }
`;

export const SelectCarListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 4px;
`;

export const CarListContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  gap: 4px;
`;

export const CarListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CarImageWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 4px;
  overflow: hidden;
`;

export const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CheckboxWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const CarTitle = styled.span`
  width: 140px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.25px;
  line-height: 1.2;
  word-break: keep-all;
  word-wrap: break-word;
`;

export const CarInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 4px;
`;

export const CarInfo = styled.div`
  font-size: 14px;
  color: rgba(62, 56, 96, 0.47);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  letter-spacing: 0.25px;
`;

export const TagWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 4px;
`;

export const HashTagContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

export const HashTag = styled.button`
  padding: 4px 10px;
  background-color: ${theme.colors.primary};
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

export const Price = styled.span`
  font-size: 14px;
  color: #000;
  font-weight: 600;
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-bottom: 24px;
`;
