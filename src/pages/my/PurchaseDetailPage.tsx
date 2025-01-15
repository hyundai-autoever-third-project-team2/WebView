import React from 'react';
import styled from 'styled-components';
import Toolbar from 'components/common/Toolbar';
import BottomNavigationBar from 'components/common/BottomNavigationBar/BottomNavigationBar';
import { useNavigate } from 'react-router-dom';
import { theme } from 'styles/theme';


interface PurchaseUserInfo {
  car_purchase_id:number;
  purchase_date: Date;
  name: string;
  phone: string;
  address: string;
  amount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: string;
}


const Container = styled.div`

`;

const TradeSection = styled.div`
    padding: 1.5rem;
    margin-top: 70px;
    border-bottom: 1px solid #999;

`

const Section = styled.section`
  background-color: white;
  margin-top: 20px;
  padding: 1.5rem;
  border-bottom: 1px solid #999;
`;

const TradeDate = styled.p`
    margin-bottom: 4px;
`

const TradeId = styled.p`
    color: #8C8C8C;
    
`

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InfoRow = styled.div`
  margin: 0.5rem 0;
  color: #333;
`;


const Button = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.primary ? '#ff6b00' : '#ddd'};
  background-color: ${props => props.primary ? '#ff6b00' : 'white'};
  color: ${props => props.primary ? 'white' : '#333'};
  border-radius: 4px;
  flex: 1;
  cursor: pointer;
`;

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  &:last-child {
    border-top: 1px solid #eee;
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

const Amount = styled.span<{ discount?: boolean }>`
  color: ${props => props.discount ? '#2b00ff' : '#333'};
  font-weight: ${props => props.discount ? 'normal' : 'bold'};
`;

const paymentInfo: PurchaseUserInfo = {
    car_purchase_id:131123123,
    purchase_date: new Date(),
    name: "박*연",
    phone: "010-****-5282",
    address: "(10415) 경기 수원시 어딘가 111 **********",
    amount: 32500000,
    discountAmount: -3250000,
    finalAmount: 3000000,
    paymentMethod: "카카오 페이 - 카카오"
  };

const PurchaseDetailPage: React.FC = () => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/my/purchase')
    }


  return (
    <Container>
      <Toolbar showBackButton title='주문 상세 내역' onBackClick={handleBackClick} />

      <TradeSection>
        <TradeDate>
            {new Date(paymentInfo.purchase_date).toLocaleDateString()}
        </TradeDate>
        <TradeId>
            {paymentInfo.car_purchase_id}
        </TradeId>
      </TradeSection>

      <Section>
        <SectionTitle>계약자 정보</SectionTitle>
        <InfoRow>{paymentInfo.name}</InfoRow>
        <InfoRow>{paymentInfo.phone}</InfoRow>
        <InfoRow>{paymentInfo.address}</InfoRow>
      </Section>

      <Section>
        <SectionTitle>주문 차량</SectionTitle>

      </Section>

      <Section>
        <SectionTitle>결제 정보</SectionTitle>
        <AmountRow>
          <span>차량 금액</span>
          <Amount>{paymentInfo.amount.toLocaleString()}원</Amount>
        </AmountRow>
        <AmountRow>
          <span>할인 금액</span>
          <Amount discount>{paymentInfo.discountAmount.toLocaleString()}원</Amount>
        </AmountRow>
        <AmountRow>
          <span>계약금 선금(결제 금액)</span>
          <Amount>{paymentInfo.finalAmount.toLocaleString()}원</Amount>
        </AmountRow>
        <AmountRow>
          <span>결제 수단</span>
          <span>{paymentInfo.paymentMethod}</span>
        </AmountRow>
      </Section>

    <BottomNavigationBar/>
    </Container>
  );
};

export default PurchaseDetailPage;