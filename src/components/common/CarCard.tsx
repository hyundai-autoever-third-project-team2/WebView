import styled from 'styled-components';
import { theme } from 'styles/theme';
import Checkbox from './CheckBox';
import { useEffect, useState } from 'react';
import ICarData from 'types/CarData';
import { useNavigate } from 'react-router-dom';
import useWishCar from 'api/wishCar/useWishCar';
import ConfirmModal, { ModalConfigType } from 'components/common/ConfirmModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchViewIsHeartCarList } from 'api/mypage/mypageApi';
import { CarListItemData } from 'types/CarListItemData';

interface CarDataProps {
  carId : number;
  imageUrl: string; //사진
  title: string; //차종
  year: string; // 연식
  mileage: string; // 주행거리
  price: string; //가격
  discountPrice?: string;
  tags?: string[]; // 태그 / 선택적으로 변경
  checked?: boolean; // 체크했나
  isLiked?: boolean; // 좋아요 눌렀나
  viewCount?: number;
  postDate?: string;
  showHeartButton?: boolean; // 좋아요버튼 보여줄건가
  showTags?: boolean; // 태그 보여줄건가
  showCheckbox?: boolean; // 체크박스 보여줄건가
  showViewDate?: boolean; // 조회수, 작성일 보여줄건지지
  onCheckChange?: (checked: boolean) => void; // 체크박스 선택 됐을때 온체인지함수
  onLikeChange?: (liked: boolean) => void; // 좋아요 눌렸을때 온체인지함수
}

// export interface CarData {
//   id: number;
//   brand: string;
//   model: string;
//   price: string;
//   views: number;
//   lastDate: number;
//   modelYear: string;
//   dist: string;
//   carNumber: string;
//   fuel: string;
//   gear: string;
//   gasMileage: string;
//   carType: string;
//   displacement: string;
//   color: string;
//   imageUrlList: string[];
//   options: boolean[];
//   fixedLogImageList: string[];
// }

const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  cursor: pointer;
  
  @media (min-width: 500px) {
    gap: 16px;
  }
`;

const CarImage = styled.img`
  width: 160px;
  object-fit: cover;
  border-radius: 4px;

  @media (min-width: 500px) {
    width: 220px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  position: relative;
  padding: 4px;

  @media (min-width: 500px) {
    min-height: 150px;
    padding: 8px;
  }
`;

const CarTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;

  @media (min-width: 500px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const CarYear = styled.div`
  font-size: 12px;
  color: ${theme.colors.neutral500};
  margin-top: 4px;
  margin-bottom: 6px;

  @media (min-width: 500px) {
    font-size: 14px;
    margin-bottom: 14px;
  }
`;

const HashTagContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const HashTag = styled.button`
  padding: 4px 10px;
  background-color: ${theme.colors.primary};
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }

  @media (min-width: 500px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

const PriceContainer = styled.div`
  position: absolute;
  bottom: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (min-width: 500px) {
    bottom: 8px;
    gap: 4px;
  }
`;

const DefaultPrice = styled.span`
  font-size: 13px;
  font-weight: 600;

  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

const OriginalPrice = styled.span`
  font-size: 11px;
  color: ${theme.colors.neutral500};
  text-decoration: line-through;

  @media (min-width: 500px) {
    font-size: 12px;
  }
`;

const DiscountPrice = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.primary};

  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeartButton = styled.button`
  background: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  align-self: flex-end;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ViewDate = styled.div`
  position: absolute;
  bottom: 4px;
  right: 1rem;
`;

const ViewText = styled.span`
  font-size: 10px;
`;

const EmptyHeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
      fill="rgba(0,0,0,0.2)"
    />
  </svg>
);

const FilledHeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
      fill={theme.colors.primary}
    />
  </svg>
);

function CarCard({
  carId,
  imageUrl,
  title,
  year,
  mileage,
  price,
  viewCount,
  postDate,
  discountPrice,
  tags = ['무사고', '인증'],
  checked = false,
  isLiked = false,
  showHeartButton = false,
  showTags = false,
  showViewDate = false,
  showCheckbox = false,
  onCheckChange,
  onLikeChange,
}: CarDataProps) {
  const [internalChecked, setInternalChecked] = useState(checked);
  const [internalLiked, setInternalLiked] = useState(isLiked);
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const wishCar = carId ? useWishCar(carId) : null;

    const [modalConfig, setModalConfig] = useState<ModalConfigType>({
      isOpen: false,
      title: "",
      description: "",
      onConfirm: () => {},
    });



  useEffect(() => {
    setInternalChecked(false);
  }, [showCheckbox]);

  const handleCheckChange = (newChecked: boolean) => {
    setInternalChecked(newChecked);
    onCheckChange?.(newChecked);
  };

  //하트 버튼 동작 전 확인
  const handleLikeCheck = () => {
    {!showCheckbox &&
      setModalConfig({
        isOpen: true,
        title: "찜한 차량을 취소하시겠습니까?",
        description: "취소 시 찜 목록에서 삭제됩니다.",
        onConfirm: handleLikeClick,
      });
    }
  }

  const updateLikeCarMutation = useMutation({
    mutationFn: async () => {
      if (wishCar) {
        await wishCar.toggleLike();
        return fetchViewIsHeartCarList();
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      
      // 이전 데이터 저장
      const previousWishlist = queryClient.getQueryData(['wishlist']);
      
      // Optimistic update
      queryClient.setQueryData(['wishlist'], (old: CarListItemData[] | undefined) => 
        old ? old.filter(car => car.carId !== carId) : []
      );
      
      return { previousWishlist };
    },
    onError: (error, variables, context) => {
      // 에러 시 이전 데이터로 롤백
      queryClient.setQueryData(['wishlist'], context?.previousWishlist);
      console.error("찜한 차량 데이터 뮤테이션 실패", error);
      setInternalLiked(!internalLiked); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onSettled: () => {
      setModalConfig(prev => ({ ...prev, isOpen: false }));
    }
  });

  const handleLikeClick = () => {
    const newLiked = !internalLiked;
    setInternalLiked(newLiked);
    onLikeChange?.(newLiked);
    updateLikeCarMutation.mutate();
  };

  
  const handleCarClick = (carId : number) => () => {
    {!showCheckbox && navigate(`/car-detail/${carId}`)}
  }

  return (
    <>
    <Content>
      <CarImage src={imageUrl} alt={title} onClick={handleCarClick(carId)}/>
      <InfoContainer onClick={handleCarClick(carId)}>
        <CarTitle>{title}</CarTitle>
        <CarYear>
          {year} {mileage}
        </CarYear>
        {showTags && tags.length > 0 && (
          <HashTagContainer>
            {tags.map((tag, index) => (
              <HashTag key={index}>{tag}</HashTag>
            ))}
          </HashTagContainer>
        )}
        <PriceContainer>
          {discountPrice ? (
            <>
              <OriginalPrice>{price}</OriginalPrice>
              <DiscountPrice>{'할인가 ' + discountPrice}</DiscountPrice>
            </>
          ) : (
            <DefaultPrice>{price}</DefaultPrice>
          )}
        </PriceContainer>
        {showViewDate && (
          <ViewDate>
            <ViewText>{viewCount}</ViewText>
            <ViewText>{postDate?.toLocaleString()}</ViewText>
          </ViewDate>
        )}
      </InfoContainer>
      <ActionsWrapper>
        {showCheckbox && <Checkbox checked={internalChecked} onChange={handleCheckChange} />}
        <div />
        {showHeartButton && (
          <HeartButton onClick={handleLikeCheck}>
            {internalLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
          </HeartButton>
        )}
      </ActionsWrapper>
    </Content>
    <ConfirmModal
      isOpen={modalConfig.isOpen}
      onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
      onConfirm={modalConfig.onConfirm}
      title={modalConfig.title}
      description={modalConfig.description}
      />
    </>
  );
}
export default CarCard;
