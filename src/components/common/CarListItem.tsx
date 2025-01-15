import { Clock, Eye } from 'lucide-react';
import styled from 'styled-components';
import { CarListItemData } from 'types/CarListItemData';
import { getElapsedTime } from 'utils/getElapsedTime';

interface CarListItemProps {
  data: CarListItemData;
}

function CarListItem({ data }: CarListItemProps) {
  return (
    <CarListItemWrapper>
      <CarListItemImage src={data.imageUrl} />
      <CarListItemInfo>
        <CarListItemInfoModel>
          {data.brand} {data.modelName}
        </CarListItemInfoModel>
        <CarListItemInfoYearAndDistance>
          {data.modelYear} {data.distance.toLocaleString()}km
        </CarListItemInfoYearAndDistance>
        <CarListItemInfoPrice>{data.price.toLocaleString()}만원</CarListItemInfoPrice>
        <CarListItemInfoDateAndViewCount>
          <Clock size={10} />
          {getElapsedTime(data.createDate)}
          <Eye size={10} />
          {data.viewCount}
        </CarListItemInfoDateAndViewCount>
      </CarListItemInfo>
    </CarListItemWrapper>
  );
}

export default CarListItem;

export const CarListItemWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
`;

export const CarListItemImage = styled.img`
  width: 130px;
  height: 90px;
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

export const CarListItemInfoPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
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
