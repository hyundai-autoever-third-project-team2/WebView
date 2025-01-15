import CarData from "components/common/CarData"
import Toolbar from "components/common/Toolbar"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import RightButton from "../../assets/icon_right_button_primary.svg"
import XButton from "../../assets/icon_close.svg"
import { keyframes, css } from 'styled-components';

import temp from "../../assets/feed_sample.jpg"
import { theme } from "styles/theme"
import { useEffect, useState } from "react"

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const Container = styled.div`
  height: 100%;
  margin-top: 90px;
  position: relative;
  padding: 20px;
`

const CompareButton = styled.div`
  position: absolute;
  top: -1.2rem;
  right: 0.4rem;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${theme.colors.primary};
  cursor: pointer;
`

const WishList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SelectModal = styled.div<{ $isClosing?: boolean }>`
  background-color: #FAE9CD;
  position: fixed; 
  left: 0;
  bottom: 0;
  width: 100%;
  height: 15rem;
  z-index: 10000;
  border-radius: 20px 20px 0 0; 
  animation: ${props => props.$isClosing ? 
    css`${slideDown} 0.5s ease-in forwards` : 
    css`${slideUp} 0.5s ease-out forwards`
  };
  display: flex;
  justify-content:center;
  align-items: center;
`;

const ModalOverlay = styled.div<{ $show: boolean }>`
  opacity: ${props => (props.$show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const CancelButton = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  padding: 8px;
`;

const SelectedCount = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const SelectedList = styled.div`
  width: 100%;
  max-height: 120px;
  overflow-y: auto;
  margin: 10px 0;
  padding: 0 20px;
`;

const SelectedItem = styled.div`
  padding: 8px;
  margin: 4px 0;
  background-color: white;
  border-radius: 4px;
  font-size: 12px;
`;

const CompareActionButton = styled.button<{ disabled: boolean }>`
  padding: 12px 24px;
  background-color: ${props => props.disabled ? '#ccc' : theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  margin-top: 16px;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : theme.colors.primaryDark};
  }
`;

function WishlistPage() {
  const navigate = useNavigate();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedCars, setSelectedCars] = useState<Array<{
    id: string;
    title: string;
  }>>([]);
  const [isClosing, setIsClosing] = useState(false);

  const carList = [
    {
      id: '1',
      imageUrl: temp,
      title: "벤츠 E-클래스 5세대 E250 아방가르드 W213",
      year: "2018년 10월",
      mileage: "35,557km",
      price: "1000만원",
      tags: ["무사고", "인증"],
      viewCount: 102,
      isLiked: true,
      postDate: new Date(),
    },
    {
      id: '2',
      imageUrl: temp,
      title: "벤츠 E-클래스 5세대 E250 아방가르드 W213",
      year: "2018년 10월",
      mileage: "35,557km",
      price: "1000만원",
      tags: ["무사고", "인증"],
      viewCount: 102,
      isLiked: true,
      postDate: new Date(),
    },
  ];

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCompareButtonClick = () => {
    setShowCheckboxes(true);
  };

  const handleXButtonClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowCheckboxes(false);
      setIsClosing(false);
      setSelectedCars([]); // 모달 닫을 때 선택 초기화
    }, 500);
  };

  // 체크박스 상태 변경 핸들러
  const handleCarSelect = (carId: string, carTitle: string) => (checked: boolean) => {
    if (checked) {
      setSelectedCars(prev => [...prev, { id: carId, title: carTitle }]);
    } else {
      setSelectedCars(prev => prev.filter(car => car.id !== carId));
    }
  };

  // 차량 비교하기 핸들러
  const handleCompare = () => {
    if (selectedCars.length < 2) {
      alert('2대 이상의 차량을 선택해주세요.');
      return;
    }
    // 비교 페이지로 이동 또는 비교 로직 실행
    console.log('Selected cars for comparison:', selectedCars);
    // navigate('/compare', { state: { cars: selectedCars } });
  };

  return (
    <>
      <Toolbar title="관심 차량" showBackButton onBackClick={handleBackClick}/>
      <Container>
        {!showCheckboxes && (
          <CompareButton onClick={handleCompareButtonClick}>
            차량비교하기
            <img src={RightButton}/>
          </CompareButton>
        )}
        <WishList>
          {carList.map(car => (
            <CarData 
              key={car.id}
              imageUrl={car.imageUrl}
              title={car.title}
              year={car.year}
              mileage={car.mileage}
              price={car.price}
              tags={car.tags}
              viewCount={car.viewCount}
              isLiked={car.isLiked}
              postDate={car.postDate}
              showTags
              showViewDate
              showHeartButton
              showCheckbox={showCheckboxes}
              checked={selectedCars.some(selected => selected.id === car.id)}
              onCheckChange={handleCarSelect(car.id, car.title)}
            />
          ))}
        </WishList>
      </Container>
      
      {showCheckboxes && (
        <>
          <ModalOverlay $show={showCheckboxes} />
          <SelectModal $isClosing={isClosing}>
            <CancelButton src={XButton} onClick={handleXButtonClick}/>
            <ModalContent>
              <SelectedCount>
                선택된 차량: {selectedCars.length}대
              </SelectedCount>
              {/* {selectedCars.length > 0 && (
                <SelectedList>
                  {selectedCars.map(car => (
                    <SelectedItem key={car.id}>
                    </SelectedItem>
                  ))}
                </SelectedList>
              )} */}
              <CompareActionButton 
                disabled={selectedCars.length < 2}
                onClick={handleCompare}
              >
                비교하기
              </CompareActionButton>
            </ModalContent>
          </SelectModal>
        </>
      )}
    </>
  );
}


export default WishlistPage;