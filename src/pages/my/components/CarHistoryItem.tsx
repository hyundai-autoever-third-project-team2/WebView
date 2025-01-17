import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ActionButtonType {
  text: string;
  action: () => void;
}

type StatusLabelProps = {
  $status: string;
};

// CarHistoryItem 판매, 구매 구분없이 일반화된 props
interface CarHistoryItemProps {
  date?: string;
  status?: string;
  title?: string;
  model?: string;
  price?: string;
  monthlyPayment?: string;
  imageUrl?: string;
  isPurchase? : boolean;
}

const CarHistoryContainer = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 20px;
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
    switch ($status) { // progress별 색상 정하자
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

const ActionButtonContainer = styled.div`
  position: absolute;
  bottom: 12px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{$isDecline : boolean}>`
  width: 60px;
  height: 25px;
  padding: 6px 10px;
  font-size: 10px;
  background-color: white;
  color: ${({ $isDecline }) => $isDecline ? theme.colors.error : theme.colors.primary};
  border: 1px solid ${({ $isDecline }) => $isDecline ? theme.colors.error : theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
`;

const CarHistoryItem: React.FC<CarHistoryItemProps> = ({ 
  date = "날짜",
  status = "정보",
  title = "이름",
  model = "주문번호",
  price = "가격",
  monthlyPayment = "",
  imageUrl = "이미지url",
  isPurchase = false
}) => {
  const navigate = useNavigate();

  const getActionButtons = ($status: string): ActionButtonType[] => {
    switch ($status) {
      case "심사중":
        return [
          {
            text: "판매 취소",
            action: () => {
              // 판매 취소 로직
              console.log("판매 취소");
            }
          }
        ];
      case "심사 완료":
        return [
          {
            text: "판매 승인",
            action: () => {
              // 판매 데이터로 서버에 보내는 로직 고고
            }
          },
          {
            text: "판매 거절",
            action: () => {
              // 판매 취소, 거절 : 프론트(매입차량id값 post), 백(해당 id값 프로그레스 판매거절로 변경)
            }
          }
        ];
      default:
        return [];
    }
  };

  const handleDetailButtonClick = (purchaseCarId : string) => () => {
    navigate(`/my/purchase/${purchaseCarId}`)
  }

  const actionButtons = getActionButtons(status);

  return (
    <CarHistoryContainer>
      {/* 기존 코드 유지 */}
      <TopWrapper>
        <DateText>{date}</DateText>
        {isPurchase && (
          <DetailButton onClick={handleDetailButtonClick('2')}>상세보기</DetailButton>
        )}
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
            <CarPrice>{price}  {monthlyPayment}</CarPrice>
          </div>
        </InfoContainer>
      </ContentWrapper>
      
      {actionButtons.length > 0 && (
        <ActionButtonContainer>
          {actionButtons.map((button, index) => (
            <ActionButton 
              key={index} 
              onClick={button.action}
              $isDecline={button.text === "판매 거절"}
            >
              {button.text}
            </ActionButton>
          ))}
        </ActionButtonContainer>
      )}
    </CarHistoryContainer>
  );
};

export default CarHistoryItem;