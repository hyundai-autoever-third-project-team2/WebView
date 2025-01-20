import Toolbar from 'components/common/Toolbar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface GuideItem {
  title: string;
  content: string;
  category: string;
}

interface AccordionProps {
  $isOpen: boolean;
}

// const theme = {
//   primary: '#2C3E50',    // 딥네이비
//   secondary: '#E74C3C',  // 레드 포인트
//   accent: '#3498DB',     // 밝은 파랑
//   background: '#ECF0F1', // 연한 회색
//   text: '#2C3E50',       // 진한 네이비
//   border: '#BDC3C7'      // 연한 회색 보더
// };

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white;
`;

const Gap = styled.div`
    height: 70px;
`

const CategorySection = styled.div`
  margin-bottom: 32px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid ;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    width: 4px;
    height: 20px;
    background-color: ${theme.colors.primary};
    margin-right: 8px;
    border-radius: 2px;
  }
`;

const GuideItem = styled.div`
  margin-bottom: 16px;
  border: 1px solid ;
  border-radius: 8px;
  overflow: hidden;
  white-space: pre-wrap;
`;

const GuideHeader = styled.div<{ $isOpen: boolean }>`
  padding: 16px;
  background-color: ${props => props.$isOpen ? '#ECF0F1' : 'white'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
`;

const GuideTitle = styled.h3`
  font-size: 16px;
  color: ${theme.text};
  margin: 0;
`;

const GuideContent = styled.div<AccordionProps>`
  padding: ${props => props.$isOpen ? '16px' : '0 16px'};
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  background-color: white;
  border-top: ${props => props.$isOpen ? '1px solid ${theme.border}' : 'none'};
  line-height: 1.6;
`;

const Arrow = styled.span<AccordionProps>`
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease-in-out;

`;

const GuidePage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const navigate = useNavigate()

  const guideData: GuideItem[] = [
    {
      category: "차량 매입/판매",
      title: "내 차를 판매하고 싶어요. 어떻게 해야 하나요?",
      content: "1. 앱에서 '내 차 팔기' 메뉴 선택\n2. 차량 정보(연식, 주행거리, 옵션 등) 입력\n3. 차량 사진 등록\n4. 무료 견적 신청 완료 후 전문 평가사가 견적을 낸 후, 푸쉬 알림을 통해 최종 매입가를 안내해드립니다.",
    },
    {
      category: "차량 매입/판매",
      title: "평가는 어떻게 진행되나요?",
      content: "제출 한 차량 정보를 기반으로, 전문 평가사가 차량의 외관, 내관, 엔진룸, 주행 상태 등을 꼼꼼히 점검합니다. 평가 소요시간은 약 30분 정도이며, 평가 완료 후 그 자리에서 매입 견적을 안내해드립니다. 만족하시면 승인 버튼을 통하여 바로 계약 진행이 가능합니다.",
    },
    {
      category: "차량 검색/구매",
      title: "원하는 차량을 찾으려면 어떻게 해야 하나요?",
      content: "앱 상단의 검색 필터를 통해 제조사, 모델, 연식, 가격대, 주행거리, 색상 등 상세 조건으로 검색이 가능합니다. 관심 차량을 찜하면 가격 변동 알림을 받아보실 수 있으며, 유사 차량 추천 서비스도 제공됩니다.",
    },
    {
      category: "차량 검색/구매",
      title: "차량 구매 시 보증은 어떻게 되나요?",
      content: "당사에서 판매되는 모든 차량은 기본 1개월/2,000km 보증이 제공됩니다. 추가로 유상 보증 상품 가입 시 최대 1년까지 보증 기간 연장이 가능합니다. 보증 범위는 엔진, 변속기 등 주요 부품을 포함합니다.",
    },
    {
      category: "서비스/기타",
      title: "차량 등록/이전 대행도 해주시나요?",
      content: "네, 차량 구매 시 등록/이전 대행 서비스를 제공해드립니다. 필요 서류 안내부터 실제 등록까지 전 과정을 도와드리며, 대행 수수료는 지역에 따라 차이가 있을 수 있습니다.",
    },
    {
      category: "서비스/기타",
      title: "할부 구매는 어떻게 진행되나요?",
      content: "타볼카 앱 내에서 예상 할부금을 미리 계산 해드리고 있습니다. 실제 할부 신청 시에는 제휴 금융사를 통해 진행되며, 최대 72개월까지 가능합니다. 신용도에 따라 금리는 차이가 있을 수 있습니다.",
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const groupedGuides = guideData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GuideItem[]>);

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <>
    <Toolbar showLogo title=' 이용안내' showBackButtonWhite titleAlignment='left' color='white' backgroundColor={theme.colors.primary} onBackClick={handleBackClick}/>
    <Gap/>
    <Container>
      {Object.entries(groupedGuides).map(([category, items], categoryIndex) => (
          <CategorySection key={categoryIndex}>
          <CategoryTitle>{category}</CategoryTitle>
          {items.map((item, itemIndex) => {
              const globalIndex = itemIndex + categoryIndex * items.length;
              return (
              <GuideItem key={itemIndex}>
                <GuideHeader 
                  $isOpen={openItems.includes(globalIndex)}
                  onClick={() => toggleItem(globalIndex)}
                  >
                  <GuideTitle>{item.title}</GuideTitle>
                  <Arrow $isOpen={openItems.includes(globalIndex)}>▼</Arrow>
                </GuideHeader>
                <GuideContent $isOpen={openItems.includes(globalIndex)}>
                  {item.content}
                </GuideContent>
              </GuideItem>
            );
        })}
        </CategorySection>
      ))}
    </Container>
    </>
  );
};

export default GuidePage;