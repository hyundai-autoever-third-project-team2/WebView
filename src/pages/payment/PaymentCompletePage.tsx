import { useLocation, useNavigate } from 'react-router-dom';
import Toolbar from 'components/common/Toolbar';
import Button from 'components/common/Button';
import styled from 'styled-components';
import { CheckCircle } from 'lucide-react';
import { changeCarContractStatus } from 'api/carPurchase/reservationApi';

export function PaymentCompletePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const paymentResult = state?.paymentResult;
  const purchasedCarId = localStorage.getItem('carId');

  const handleConfirm = async () => {
    if (purchasedCarId) {
      const response = await changeCarContractStatus(Number(purchasedCarId));
      console.log(response);
    }
    navigate('/');
  };

  return (
    <>
      <Toolbar title="결제 완료" showBackButton={false} />
      <Container>
        <ContentWrapper>
          <IconWrapper>
            <CheckCircle size={48} color="#4CAF50" />
          </IconWrapper>
          <Title>계약금 결제가 완료되었습니다</Title>
          <Description>영업일 기준 1-2일 내로 담당자가 연락드릴 예정입니다.</Description>

          <PaymentInfoBox>
            <PaymentInfoTitle>결제 정보</PaymentInfoTitle>
            <PaymentInfoRow>
              <Label>상품명</Label>
              <Value>{paymentResult?.item_name}</Value>
            </PaymentInfoRow>
            <PaymentInfoRow>
              <Label>결제 금액</Label>
              <Value>{Number(paymentResult?.amount?.total).toLocaleString()}원</Value>
            </PaymentInfoRow>
            <PaymentInfoRow>
              <Label>결제 수단</Label>
              <Value>카카오페이</Value>
            </PaymentInfoRow>
            <PaymentInfoRow>
              <Label>결제 일시</Label>
              <Value>{new Date(paymentResult?.approved_at).toLocaleString()}</Value>
            </PaymentInfoRow>
          </PaymentInfoBox>
        </ContentWrapper>

        <ButtonWrapper>
          <Button onClick={handleConfirm}>확인</Button>
        </ButtonWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 56px);
  padding: 24px 16px;
  background-color: white;
  margin-top: 56px;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 32px;
`;

const PaymentInfoBox = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 24px;
`;

const PaymentInfoTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const PaymentInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  color: #666;
`;

const Value = styled.span`
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
`;

export default PaymentCompletePage;
