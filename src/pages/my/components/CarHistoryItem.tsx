import styled from 'styled-components';
import { theme } from 'styles/theme';

type StatusLabelProps = {
  $status: string;
};

// CarHistoryItem props erd보고 제대로 써야 함
interface CarHistoryItemProps {
  date?: string;
  status?: string;
  title?: string;
  model?: string;
  price?: string;
  monthlyPayment?: string;
  imageUrl?: string;
}

const CarHistoryContainer = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 80px;
  position: relative;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DateText = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const DetailButton = styled.div`
  font-size: 14px;
  color: #666;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;

const StatusLabel = styled.div<StatusLabelProps>`
  font-size: 14px;
  margin-bottom: 12px;
  color: ${({ $status }) => {
    switch ($status) {
      case "판매 처리":
        return "red";
      case "구매 확정":
        return "#00A36C";
      case "배송중":
        return "#2B7DE9";
      default:
        return "#666";
    }
  }};
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const CarImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CarTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const CarDetails = styled.div`
  font-size: 14px;
  color: ${theme.colors.neutral700};
  margin-top: 4px;
`;

const CarPrice = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const ActionButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 8px 16px;
  font-size: 14px;
  background-color: white;
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
  }
`;

const CarHistoryItem: React.FC<CarHistoryItemProps> = ({ 
  date = "날짜",
  status = "정보",
  title = "이름",
  model = "주문번호",
  price = "가격",
  monthlyPayment = "할부",
  imageUrl = "이미지url"
}) => {
  const getActionButton = ($status: string) => {
    switch ($status) {
      case "시세 측정 중":
        return { text: "판매 취소", show: true };
      case "구매 확정":
        return { text: "리뷰작성", show: true };
      case "판매 처리":
        return { text: "계약서보기", show: true };
      default:
        return { show: false };
    }
  };

  const actionButton = getActionButton(status);

  return (
    <CarHistoryContainer>
      <TopWrapper>
        <DateText>{date}</DateText>
        <DetailButton>상세보기</DetailButton>
      </TopWrapper>
      <StatusLabel $status={status}>{status}</StatusLabel>
      <ContentWrapper>
        <CarImage src={imageUrl} alt="Car" />
        <InfoContainer>
          <div>
            <CarTitle>{title}</CarTitle>
            <CarDetails>{model}</CarDetails>
          </div>
          <div>
            <CarPrice>{price} / {monthlyPayment}</CarPrice>
          </div>
        </InfoContainer>
      </ContentWrapper>
      {actionButton.show && (
        <ActionButton>
          {actionButton.text}
        </ActionButton>
      )}
    </CarHistoryContainer>
  );
};

export default CarHistoryItem;