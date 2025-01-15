import styled from 'styled-components';
import { LAYOUT } from 'styles/constants';

export const PurchaseCarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${LAYOUT.TOOLBAR_HEIGHT};
`;

export const SectionGap = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral100};
  height: 10px;
`;

export const PurchaseCarPageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.header};
`;

export const ContractorInfoSection = styled(PurchaseCarPageSection)``;

export const ContractorName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const CarInfoSection = styled(PurchaseCarPageSection)``;

export const CarModelName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const ContractPriceSection = styled(PurchaseCarPageSection)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;

export const CarPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CarPriceTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const CarPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const TotalPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.neutral100};
`;

export const HighlightedCarPriceWrapper = styled(CarPriceWrapper)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.header};
  color: ${({ theme }) => theme.colors.primary};
`;

export const DownPaymentSection = styled(PurchaseCarPageSection)``;

export const AgreementSection = styled(PurchaseCarPageSection)`
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;

export const SectionSubtitle = styled(SectionTitle)`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral800};
`;

export const AgreementCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral200};
  padding: 20px 0px;
  gap: 20px;
`;

export const AgreementCheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.neutral800};
`;

export const AgreementCheckboxDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const AgreementCheckboxSubtext = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const AgreementCheckbox = styled.input`
  margin-left: 0px;
  margin-right: 10px;
`;

export const ButtonSection = styled(PurchaseCarPageSection)``;
