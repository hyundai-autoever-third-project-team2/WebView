import { Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CarListItemData } from 'types/CarListItemData';
import { getElapsedTime } from 'utils/getElapsedTime';

interface CarListItemProps {
  data: CarListItemData;
}

function CarListItem({ data }: CarListItemProps) {
  const navigate = useNavigate();

  return (
    <CarListItemWrapper onClick={() => navigate(`/car-detail/${data.carId}`)}>
      <CarListItemImage src={data.imageUrl} />
      <CarListItemInfo>
        <CarListItemInfoModel>
          {data.brand} {data.model_name}
        </CarListItemInfoModel>
        <CarListItemInfoYearAndDistance>
          {data.model_year} {data.distance.toLocaleString()}km
        </CarListItemInfoYearAndDistance>
        {data.discount_price === 0 ? (
          <CarListItemInfoPrice>{data.price.toLocaleString()}만원</CarListItemInfoPrice>
        ) : (
          <CarListItemInfoDiscountWrapper>
            <CarListItemInfoPrice $isDiscount>{data.price.toLocaleString()}만원</CarListItemInfoPrice>
            <CarListItemInfoDiscountPrice>
              할인가 {data.discount_price.toLocaleString()}만원
            </CarListItemInfoDiscountPrice>
          </CarListItemInfoDiscountWrapper>
        )}
        <CarListItemInfoDateAndViewCount>
          <Clock size={10} />
          {getElapsedTime(data.create_date)}
          <Eye size={10} />
          {data.view_count}
        </CarListItemInfoDateAndViewCount>
      </CarListItemInfo>
    </CarListItemWrapper>
  );
}

export default CarListItem;

export const CarListItemWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  animation: fadeUp 0.3s ease;
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CarListItemImage = styled.img`
  width: 130px;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const CarListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
`;

export const CarListItemInfoModel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const CarListItemInfoYearAndDistance = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.grayLight};
`;

export const CarListItemInfoPrice = styled.div<{ $isDiscount?: boolean }>`
  color: ${({ $isDiscount }) => ($isDiscount ? 'gray' : 'black')};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ $isDiscount }) => ($isDiscount ? '0.7rem' : '1rem')};
  text-decoration: ${({ $isDiscount }) => ($isDiscount ? 'line-through' : 'none')};
`;

export const CarListItemInfoMonthPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const CarListItemInfoDiscountPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const CarListItemInfoDateAndViewCount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.grayLight};

  svg {
    margin: 0px;
  }
`;

const CarListItemInfoDiscountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
