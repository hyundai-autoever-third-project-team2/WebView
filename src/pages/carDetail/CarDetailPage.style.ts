import styled from 'styled-components';
import { theme } from 'styles/theme';

export const CarDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #eeeded;
  padding-top: 60px;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
  padding: 24px;
`;

export const TagWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const CompareCarButtonWrapper = styled.label`
  display: flex;
  gap: 4px;
  align-items: center;

  cursor: pointer;
`;

export const CompareCarButton = styled.button`
  color: ${theme.colors.primary};
  font-family: Pretendard;
  font-size: 16px;
  background: none;
`;

export const SwiperWrapper = styled.div`
  width: 100%;
`;

export const ModelInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 24px;
  background-color: #fff;
`;

export const ModelName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.25px;
  background-color: #fff;
`;

export const ModelInfo = styled.div`
  display: flex;
  gap: 4px;
  color: rgba(62, 56, 96, 0.47);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  letter-spacing: 0.25px;
`;

export const IconWrapper = styled.div`
  display: flex;
`;

export const InfoText = styled.span`
  display: flex;
  align-items: center;
  color: rgba(62, 56, 96, 0.47);
  font-family: Pretendard;
  font-size: 12px;
`;

export const Price = styled(ModelName)`
  margin: 12px 0;
`;

export const BoxCarInfoContainer = styled.div`
  position: relative;
  display: flex;
  gap: 6px;
`;

export const BoxInfoWrapper = styled.div`
  width: 90px;
  height: 60px;
  border-radius: 8px;
  border: 1px solid rgba(62, 56, 96, 0.47);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 12px;
`;

export const BoxInfoValue = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.25px;
`;
export const DistStandardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
`;

export const DistStandardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 32px;
`;

export const DistStandardText = styled.span`
  width: 200px;
  color: #000;
  font-family: 'Pretendard GOV Variable';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.25px;
`;

export const FlexDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const BaiscInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background-color: #fff;
`;
export const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px; /* 100% */
  letter-spacing: 0.25px;
  margin-bottom: 12px;
`;

export const BasicInfoWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BasicInfoText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.25px;
`;

export const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 12px;
  background-color: #fff;
`;

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const OptionImageWrapper = styled.div`
  width: 60px;
  height: 60px;
`;

export const OptionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const OptionText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.25px;
`;

export const StausWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 12px;
  background-color: #fff;
`;

export const StatusResult = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: rgba(213, 209, 210, 0.2);
  font-size: 14px;
  padding: 8px 0;
`;

export const StatusResultText = styled.span`
  color: #000;
  font-family: Pretendard;
  line-height: 20px;
  letter-spacing: 0.25px;
`;

export const StatusResultColorText = styled(StatusResultText)`
  color: #07b2d9;
  font-size: 14px;
`;

export const BoxStatusInfo = styled(BoxInfoWrapper)`
  width: 110px;
`;

export const SimilarCarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 12px;
  background-color: #fff;
`;

export const SimilarCarFlexRow = styled.div`
  display: flex;
  gap: 4px;
`;

export const SimilarCarFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SimilarCarImageWrapper = styled.div`
  width: 103px;
  height: 77px;
  border-radius: 2px;
  overflow: hidden;
`;

export const SimilarImage = styled(OptionImage)``;

export const SimilarCarTitle = styled.div`
  width: 100px;
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  line-height: 12px; /* 120% */
  letter-spacing: 0.25px;
  word-break: keep-all;
  word-wrap: break-word;
`;

export const SimilarCarPrice = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25px;
`;
