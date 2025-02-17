import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Toolbar from 'components/common/Toolbar';
import BottomNavigationBar from 'components/common/BottomNavigationBar/BottomNavigationBar';
import { useNavigate, useParams } from 'react-router-dom';
import { theme } from 'styles/theme';
import { useUser } from 'hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { queries } from 'queries';
import { calculateRegistrationFee } from 'utils/calculateRegistrationFee';

interface CarDetailData {
  created_at: string;
  price: number;
  discount_price: number;
  progress: string;
  agency_name: string;
  car_number: string;
  brand: string;
  model_name: string;
  model_year: string;
  carImages: string[];
}

const Container = styled.div`
  padding-bottom: 60px;
`;

const TradeSection = styled.div`
  padding: 1.5rem;
  margin-top: 70px;
  border-bottom: 1px solid ${theme.colors.neutral300};
`;

const Section = styled.section`
  background-color: white;
  margin-top: 20px;
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.colors.neutral300};
`;

const TradeDate = styled.p`
  margin-bottom: 4px;
  font-weight: 500;
`;

const TradeId = styled.p`
  color: ${theme.colors.neutral600};
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InfoRow = styled.div`
  margin: 0.5rem 0;
  color: ${theme.colors.neutral800};
`;

const CarImage = styled.img`
  width: 80%;
  max-width: 600px;
  object-fit: fill;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CarTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CarDetail = styled.p`
  color: ${theme.colors.neutral600};
  font-size: 0.875rem;
  margin: 0.25rem 0;
`;

const StatusLabel = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background-color: ${theme.colors.primary}15;
  color: ${theme.colors.primary};
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  &:last-child {
    border-top: 1px solid ${theme.colors.neutral200};
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

const Amount = styled.span<{ $discount?: boolean }>`
  color: ${props => props.$discount ? theme.colors.primary : theme.colors.neutral900};
  font-weight: 600;
`;

const PurchaseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { purchaseId } = useParams<{ purchaseId: string }>();
  const { data: user } = useUser();
  const { data } = useQuery({ ...queries.car.detail(Number(purchaseId)) });


  const handleBackClick = () => {
    navigate(-1);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}원`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (!data) {
    return (
      <Container>
        <Toolbar showBackButton title="주문 상세 내역" onBackClick={handleBackClick} />
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Toolbar showBackButton title="주문 상세 내역" onBackClick={handleBackClick} />

      <TradeSection>
        <TradeDate>{formatDate(data?.created_at)}</TradeDate>
        <TradeId>주문번호: A-2025011{purchaseId}</TradeId>
      </TradeSection>

      <Section>
        <SectionTitle>계약자 정보</SectionTitle>
        <InfoRow>{user?.nickname || '이름 정보 없음'}</InfoRow>
        <InfoRow>{'010-****-9538'}</InfoRow>
        <InfoRow>{'경기도 고양시 일산동구 강송로 195, *** **** ***동 ****호'}</InfoRow>
      </Section>

      <Section>
        <SectionTitle>차량 정보</SectionTitle>
        <CarImage src={data?.carImages[0]} alt={`${data?.brand} ${data?.model_name}`} />
        <CarInfo>
          <CarTitle>{data?.brand} {data?.model_name}</CarTitle>
          <CarDetail>차량번호: {data?.car_number}</CarDetail>
          <CarDetail>연식: {data?.model_year}</CarDetail>
          <CarDetail>판매처: {data?.agency_name}</CarDetail>
          <StatusLabel>{data?.progress}</StatusLabel>
        </CarInfo>
      </Section>

      <Section>
        <SectionTitle>결제 정보</SectionTitle>
        <AmountRow>
          <span>차량 금액</span>
          <Amount>{formatPrice(data?.price * 10000)}</Amount>
        </AmountRow>
          <AmountRow>
            <span>할인 금액</span>
        {data?.discount_price > 0 ? (
            <Amount $discount>{formatPrice(data?.price * 10000 - data?.discount_price * 10000)}</Amount>
          ) : (
            <Amount style={{color:theme.colors.primary}}>할인 정보 없음</Amount>
          )}
          </AmountRow>
        <AmountRow>
          <span>이전 등록 비</span>
          <Amount>{calculateRegistrationFee(data?.price * 10000).toLocaleString() + '원'}</Amount>
        </AmountRow>
        <AmountRow>
          <span>계약금</span>
          <Amount>300,000원</Amount>
        </AmountRow>
        <AmountRow>
          <span>최종 결제 금액</span>
          {data?.discount_price > 0 ? (
            <Amount>{formatPrice(data?.discount_price * 10000 + calculateRegistrationFee(data?.discount_price * 10000) - 300000)}</Amount>
          ) :
          (
            <Amount>{formatPrice(data?.price * 10000 + calculateRegistrationFee(data?.price * 10000) - 300000)}</Amount>
          )}
        </AmountRow>
      </Section>
    </Container>
  );
};

export default PurchaseDetailPage;