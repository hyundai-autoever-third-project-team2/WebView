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

export const CarInfoSection = styled(PurchaseCarPageSection)<{ $isOpen: boolean }>`
  svg {
    margin: 0;
    transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
    transition: transform 0.3s ease-in-out;
    color: ${({ theme }) => theme.colors.neutral500};
  }

  &:active svg {
    background-color: ${({ theme }) => theme.colors.neutral100};
    border-radius: 50%;
  }
`;

export const CarInfoDetailSection = styled(PurchaseCarPageSection)`
  padding: 0 20px 20px 20px;
  gap: 10px;
  justify-content: flex-start;
`;

export const CarInfoRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CarInfoDetailImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const CarInfoDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CarModelName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const CarInfoYearAndDistance = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral800};
`;

export const CarInfoPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.header};
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
  align-items: center;
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
  width: 12px;
  height: 12px;
  margin: 0;
  margin-right: 10px;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonSection = styled(PurchaseCarPageSection)``;

export const ReservationSection = styled(PurchaseCarPageSection)``;

export const DatePickerWrapper = styled.div`
  .react-datepicker {
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    font-family: inherit;
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid #e1e1e1;
  }

  .react-datepicker__current-month {
    font-size: 16px;
    font-weight: 600;
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }

  .react-datepicker__day:hover {
    border-radius: 50%;
  }
`;

export const DateInput = styled.input`
  width: auto;
  padding: 1px 0px;
  border: none;
  font-size: 16px;
  /* color: ${({ theme }) => theme.colors.neutral800}; */
  font-family: inherit;
  text-align: right;
  caret-color: transparent;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
