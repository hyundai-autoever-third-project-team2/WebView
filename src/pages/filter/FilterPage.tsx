import Button from 'components/common/Button';
import { useState, useEffect, useRef, RefObject } from 'react';
import styled from 'styled-components';

const CarFilter = () => {
  const [activeSection, setActiveSection] = useState('year');
  const [yearRange, setYearRange] = useState({ start: 2018, end: 2025 });
  const [mileageRange, setMileageRange] = useState({ start: 0, end: 100000 });
  const [rangeValue, setRangeValue] = useState(50);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!contentRef.current) return;

    const sections = contentRef.current.querySelectorAll('section');
    const scrollPosition = contentRef.current.scrollTop;
    const headerHeight = 56;

    let currentSection = '';
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.clientHeight;

      if (scrollPosition + headerHeight >= top - 50 && scrollPosition + headerHeight < top + height) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  };
  
  const handlePriceRange = (e: any) => {
    const value = e.target.value;
    const progress = (value - e.target.min) / (e.target.max - e.target.min) * 100;
    e.target.style.setProperty('--range-progress', `${progress}%`);
    setRangeValue(value);
  };

  const handleMileageRange = (type: any) => (e: any) => {
    const value = Number(e.target.value);
    const min = Number(e.target.min);
    const max = Number(e.target.max);
    const progress = ((value - min) / (max - min)) * 100;
    
    e.target.style.setProperty('--range-progress', `${progress}%`);
    setMileageRange(prev => ({ ...prev, [type]: value }));
  };

  useEffect(() => {
    const scrollContainer = contentRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // 초기 로드시 실행
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <Container>
      <Header>
        <Title>차량 필터</Title>
        <CloseButton>✕</CloseButton>
      </Header>

      <Content>
        <MenuList>
          <MenuItem
            $active={activeSection === 'type'}
            onClick={() => {
              const element = document.getElementById('type');
              if (element) {
                const headerHeight = 56;
                const elementPosition = element.offsetTop;
                contentRef.current?.scrollTo({
                  top: elementPosition - headerHeight,
                  behavior: 'smooth',
                });
              }
            }}
          >
            차종
          </MenuItem>
          <MenuItem
            $active={activeSection === 'year'}
            onClick={() => {
              const element = document.getElementById('year');
              if (element) {
                const headerHeight = 56;
                const elementPosition = element.offsetTop;
                contentRef.current?.scrollTo({
                  top: elementPosition - headerHeight,
                  behavior: 'smooth',
                });
              }
            }}
          >
            연식
          </MenuItem>
          <MenuItem
            $active={activeSection === 'mileage'}
            onClick={() => {
              const element = document.getElementById('mileage');
              if (element) {
                const headerHeight = 56;
                const elementPosition = element.offsetTop;
                contentRef.current?.scrollTo({
                  top: elementPosition - headerHeight,
                  behavior: 'smooth',
                });
              }
            }}
          >
            주행거리
          </MenuItem>
          <MenuItem
            $active={activeSection === 'price'}
            onClick={() => {
              const element = document.getElementById('price');
              if (element) {
                const headerHeight = 56;
                const elementPosition = element.offsetTop;
                contentRef.current?.scrollTo({
                  top: elementPosition - headerHeight,
                  behavior: 'smooth',
                });
              }
            }}
          >
            가격
          </MenuItem>
          <MenuItem
            $active={activeSection === 'color'}
            onClick={() => {
              const element = document.getElementById('color');
              if (element) {
                const headerHeight = 56;
                const elementPosition = element.offsetTop;
                contentRef.current?.scrollTo({
                  top: elementPosition - headerHeight,
                  behavior: 'smooth',
                });
              }
            }}
          >
            색상
          </MenuItem>
        </MenuList>

        <ScrollContent ref={contentRef} onScroll={handleScroll}>
          <Section id="type">
            <SectionTitle>차종</SectionTitle>
            <CarTypeSection>
              <TypeButton>세단</TypeButton>
              <TypeButton>해치백</TypeButton>
              <TypeButton>왜건</TypeButton>
              <TypeButton>SUV</TypeButton>
            </CarTypeSection>
          </Section>

          <Section id="year">
            <SectionTitle>연식</SectionTitle>
            <YearSelector>
              <Select
                value={yearRange.start}
                onChange={(e) => setYearRange((prev) => ({ ...prev, start: Number(e.target.value) }))}
              >
                {Array.from({ length: 8 }, (_, i) => 2018 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <span>~</span>
              <Select
                value={yearRange.end}
                onChange={(e) => setYearRange((prev) => ({ ...prev, end: Number(e.target.value) }))}
              >
                {Array.from({ length: 8 }, (_, i) => 2018 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </YearSelector>
          </Section>

          <Section id="mileage">
      <SectionTitle>주행거리</SectionTitle>
      <RangeContainer>
        <RangeWrapper>
          <RangeInput 
            type="range" 
            min="0" 
            max="100000" 
            value={mileageRange.start}
            onChange={handleMileageRange('start')}
          />
        </RangeWrapper>
        <RangeInputs>
          <NumberInput
            type="number"
            value={mileageRange.start}
            min="0"
            max="100000"
            onChange={e => handleMileageRange('start')({target: e.target})}
          />
          <span>~</span>
          <NumberInput
            type="number"
            value={mileageRange.end}
            min="0"
            max="100000"
            onChange={e => handleMileageRange('end')({target: e.target})}
          />
          <span>km</span>
        </RangeInputs>
      </RangeContainer>
    </Section>

          <Section id="price">
      <SectionTitle>가격</SectionTitle>
      <AllPriceText>전체</AllPriceText>
      <RangeInput 
        type="range" 
        min="0" 
        max="100" 
        value={rangeValue}
        onChange={handlePriceRange}
      />
    </Section>

          <Section id="color">
            <SectionTitle>색상</SectionTitle>
            <ColorGrid>
              {[
                { name: '흰색', color: '#FFFFFF', border: true },
                { name: '검정색', color: '#000000' },
                { name: '회색', color: '#808080' },
                { name: '빨간색', color: '#FF0000' },
                { name: '파란색', color: '#0000FF' },
                { name: '녹색', color: '#00FF00' },
                { name: '노란색', color: '#FFFF00' },
                { name: '갈색', color: '#964B00' },
                { name: '남색', color: '#000080' },
              ].map((color, index) => (
                <ColorButton key={index}>
                  <ColorCircle $color={color.color} $border={color.border} />
                  <span>{color.name}</span>
                </ColorButton>
              ))}
            </ColorGrid>
          </Section>
        </ScrollContent>
      </Content>

      <Footer>
        <ResetButton>초기화</ResetButton>
        <Button width="70%">필터 적용하기</Button>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 100;
  height: 56px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background-color: #fff;
  font-size: 20px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 56px;
  padding-bottom: 80px;
  min-height: calc(100vh - 56px);
`;

const MenuList = styled.div`
  width: 96px;
  position: fixed;
  top: 56px; /* Header 높이 */
  bottom: 80px; /* Footer 높이 */
  background: #f8f9fa;
`;

const MenuItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 16px;
  text-align: center;
  color: ${(props) => (props.$active ? '#3B82F6' : '#666')};
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  background-color: ${(props) => (props.$active ? 'white' : 'transparent')};
`;

const ScrollContent = styled.div<{ ref: RefObject<HTMLDivElement> }>`
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 80px 112px;
`;

const Section = styled.section`
  margin-bottom: 32px;
  &:last-child {
    min-height: calc(100vh - 136px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const CarTypeSection = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const TypeButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
`;

const YearSelector = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Select = styled.select`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 새로운 RangeWrapper 컴포넌트 추가
const RangeWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 10px 0;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  outline: none;

  /* Chrome & Safari */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #f97316; /* 오렌지 컬러로 통일 */
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
      top: 50%;
      transform: translateY(-50%);
    }
  }

  /* 진행 상태 표시를 위한 배경 그라데이션 */
  &::-webkit-slider-runnable-track {
    border-radius: 2px;
    height: 4px;
  }

  /* Range가 선택된 영역 스타일링 */
  background: linear-gradient(
    to right,
    #f97316 0%,
    #f97316 var(--range-progress, 50%),
    #e5e7eb var(--range-progress, 50%),
    #e5e7eb 100%
  );
`;

const RangeInputs = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const NumberInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AllPriceText = styled.div`
  text-align: right;
  color: #f97316;
  font-size: 14px;
  margin-bottom: 8px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ColorButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background-color: #fff;
`;

const ColorCircle = styled.div<{ $color: string; $border?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: ${(props) => (props.$border ? '1px solid #ddd' : 'none')};
`;

const Footer = styled.footer`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
`;

const ResetButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export default CarFilter;
