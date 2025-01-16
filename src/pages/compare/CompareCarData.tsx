import React from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';
import IconCancel from '../../assets/icon_cancel.svg'
import tempCar from '../../assets/feed_sample.jpg'
import { theme } from 'styles/theme';

interface CarInfo {
  id:number;
  year: number;
  model: string;
  price: number;
  monthlyPayment: number;
  downPaymentPercent: number;
  term: number;
  interestRate: number;
}

interface CarSpec {
  year: string;
  mileage: string;
  distance: string;
  engineSize: string;
  color: string;
  trim: string;
  transmission: string;
  fuelType: string;
}

interface Option {
  name: string;
  isChecked: boolean;
}

interface CompareCarDataProps {
  carInfo: CarInfo;
  specs: CarSpec;
  options: Option[];
  onClose?: () => void;
  onDetail?: () => void;
}

const Container = styled.div`
  min-width: 14rem;
  max-width: 14rem;
  background: white;
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 6px;
  font-size: 0.5rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 4px;
    gap:0.5rem;
`;

const Title = styled.h2`
  font-size: 0.85rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 12px;
`;

const CancelButton = styled.img`
    cursor: pointer;
`

const CarImage = styled.img`
    width:100%
`

const DetailButton = styled.button`
    width: 100%;
    height: 2rem;
    background-color: #fff;
    border: 1px solid;
    border-color: ${theme.colors.gray};
    border-radius: 4px;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap:0.4rem;
  margin-bottom: 1rem;
`;

const MainPrice = styled.div`
  font-weight: bold;
`;

const PaymentText = styled.div`
 font-size: 0.8rem;
`;

const PaymentDetails = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  padding-bottom: 0.6rem;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #000;
`;

const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const SpecItem = styled.div``;

const SpecLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
`;

const SpecValue = styled.div`
  font-size: 0.7rem;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap:0.4rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
`;

const CheckIcon = styled(Check)<{$isChecked : boolean}>`
  width: 16px;
  height: 16px;
  color: ${props => props.$isChecked ? theme.colors.primary : 'none'};
`;

const CompareCarData: React.FC<CompareCarDataProps> = ({
  carInfo,
  specs,
  options,
  onClose,
  onDetail
}) => {
  return (
    <Container>
      <Header>
        <Title>{carInfo.model}</Title>
        <CancelButton src={IconCancel} onClick={onClose}/>
      </Header>
      <CarImage src={tempCar}/>
      <DetailButton onClick={onDetail}>상세보기</DetailButton>
      <PriceContainer>
        <MainPrice>{carInfo.price.toLocaleString()}만원</MainPrice>
        <PaymentText>할부 월 {carInfo.monthlyPayment}만원</PaymentText>
        <PaymentDetails>* 선수금 {carInfo.downPaymentPercent}%</PaymentDetails>
        <PaymentDetails>
            {carInfo.term}개월 할부 / 금리 {carInfo.interestRate}% 기준
        </PaymentDetails>
      </PriceContainer>

      <Section>
        <SectionTitle>주요정보</SectionTitle>
        <SpecGrid>
          <SpecItem>
            <SpecLabel>연식</SpecLabel>
            <SpecValue>{specs.year}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>연비</SpecLabel>
            <SpecValue>{specs.mileage}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>주행거리</SpecLabel>
            <SpecValue>{specs.distance}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>배기량</SpecLabel>
            <SpecValue>{specs.engineSize}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>색상</SpecLabel>
            <SpecValue>{specs.color}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>트림</SpecLabel>
            <SpecValue>{specs.trim}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>변속기</SpecLabel>
            <SpecValue>{specs.transmission}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>연료</SpecLabel>
            <SpecValue>{specs.fuelType}</SpecValue>
          </SpecItem>
        </SpecGrid>
      </Section>

      <Section>
        <SectionTitle>주요옵션</SectionTitle>
        <OptionList>
          {options.map((option, index) => (
            <OptionItem key={index}>
              <CheckIcon $isChecked={option.isChecked}/>
              <span>{option.name}</span>
            </OptionItem>
          ))}
        </OptionList>
      </Section>
    </Container>
  );
};

export default CompareCarData;