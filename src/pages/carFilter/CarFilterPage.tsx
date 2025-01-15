import Button from 'components/common/Button';
import { useState, useEffect, useRef } from 'react';
import * as S from './CarFilterPage.style';
import Toolbar from 'components/common/Toolbar';
import { useNavigate } from 'react-router-dom';
import { CarFilterCondition, CarType, CarColor } from 'types/filter';

const CAR_TYPES: CarType[] = ['SUV', '경차', '대형', '상용', '소형', '스포츠카/쿠페', '준중형', '중대형'];

const COLORS: Array<{ name: CarColor; color: string; border?: boolean }> = [
  { name: '흰색', color: '#F5F5F5', border: true },
  { name: '검정', color: '#1C1C1C' },
  { name: '회색', color: '#808080' },
  { name: '남색', color: '#1C3F6E' },
  { name: '녹색', color: '#004225' },
  { name: '갈색', color: '#433831' },
  { name: '은색', color: '#C0C0C0', border: true },
  { name: '진주', color: '#FDEBD0', border: true },
  { name: '파랑', color: '#2A4B7C' },
  { name: '하늘', color: '#4B8DAD' },
];

const CarFilterPage = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('year');

  // 필터 상태를 CarFilterCondition 타입으로 관리
  const [filterCondition, setFilterCondition] = useState<CarFilterCondition>({
    carTypes: [],
    start_displacement: 0,
    end_displacement: 5000,
    start_distance: 0,
    end_distance: 100000,
    start_price: 0,
    end_price: 100000000,
    colors: [],
  });

  const handleScroll = () => {
    if (!contentRef.current) return;

    const sections = contentRef.current.querySelectorAll('section');
    const scrollPosition = contentRef.current.scrollTop;
    const headerHeight = 56;
    const menuOffset = 20;

    let currentSection = '';
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.clientHeight;

      if (
        scrollPosition + headerHeight + menuOffset >= top - 50 &&
        scrollPosition + headerHeight + menuOffset < top + height
      ) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      const headerHeight = 56;
      const menuOffset = 20;
      const elementPosition = element.offsetTop;
      contentRef.current.scrollTo({
        top: elementPosition - headerHeight - menuOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleCarTypeSelect = (carType: CarType) => {
    setFilterCondition((prev) => ({
      ...prev,
      carTypes: prev.carTypes.includes(carType)
        ? prev.carTypes.filter((type) => type !== carType)
        : [...prev.carTypes, carType],
    }));
  };

  const handleColorSelect = (color: CarColor) => {
    setFilterCondition((prev) => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }));
  };

  const resetFilter = () => {
    setFilterCondition({
      carTypes: [],
      start_displacement: 2010,
      end_displacement: 2025,
      start_distance: 0,
      end_distance: 300000,
      start_price: 0,
      end_price: 10000,
      colors: [],
    });
  };

  useEffect(() => {
    const scrollContainer = contentRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <Toolbar showBackButton onBackClick={() => navigate(-1)} title="필터" />
      <S.Container>
        <S.Content>
          <S.MenuList>
            {['type', 'year', 'mileage', 'price', 'color'].map((section) => (
              <S.MenuItem key={section} $active={activeSection === section} onClick={() => scrollToSection(section)}>
                {section === 'type' && '차종'}
                {section === 'year' && '연식'}
                {section === 'mileage' && '주행거리'}
                {section === 'price' && '가격'}
                {section === 'color' && '색상'}
              </S.MenuItem>
            ))}
          </S.MenuList>

          <S.ScrollContent ref={contentRef} onScroll={handleScroll}>
            <S.Section id="type">
              <S.SectionTitle>차종</S.SectionTitle>
              <S.CarTypeSection>
                {CAR_TYPES.map((type) => (
                  <S.TypeButton
                    key={type}
                    $active={filterCondition.carTypes.includes(type)}
                    onClick={() => handleCarTypeSelect(type)}
                  >
                    {type}
                  </S.TypeButton>
                ))}
              </S.CarTypeSection>
            </S.Section>
            <S.Section id="year">
              <S.SectionTitle>연식</S.SectionTitle>
              <S.YearSelector>
                <S.Select
                  value={filterCondition.start_displacement}
                  onChange={(e) => {
                    const newStartYear = Number(e.target.value);
                    setFilterCondition((prev) => ({
                      ...prev,
                      start_displacement: newStartYear,
                      // 시작 연도가 종료 연도보다 크면 종료 연도를 시작 연도로 설정
                      end_displacement: newStartYear > prev.end_displacement ? newStartYear : prev.end_displacement,
                    }));
                  }}
                >
                  {Array.from({ length: 16 }, (_, i) => 2010 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </S.Select>
                <span>~</span>
                <S.Select
                  value={filterCondition.end_displacement}
                  onChange={(e) => {
                    const newEndYear = Number(e.target.value);
                    setFilterCondition((prev) => ({
                      ...prev,
                      // 종료 연도가 시작 연도보다 작으면 시작 연도를 종료 연도로 설정
                      start_displacement: newEndYear < prev.start_displacement ? newEndYear : prev.start_displacement,
                      end_displacement: newEndYear,
                    }));
                  }}
                >
                  {Array.from({ length: 16 }, (_, i) => 2010 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </S.Select>
                <span>년</span>
              </S.YearSelector>
            </S.Section>
            <S.Section id="mileage">
              <S.SectionTitle>주행거리</S.SectionTitle>
              <S.YearSelector>
                <S.Select
                  value={filterCondition.start_distance}
                  onChange={(e) => {
                    const newStartDistance = Number(e.target.value);
                    setFilterCondition((prev) => ({
                      ...prev,
                      start_distance: newStartDistance,
                      // 시작 거리가 종료 거리보다 크면 종료 거리를 시작 거리로 설정
                      end_distance: newStartDistance > prev.end_distance ? newStartDistance : prev.end_distance,
                    }));
                  }}
                >
                  {Array.from({ length: 31 }, (_, i) => i * 10000).map((distance) => (
                    <option key={distance} value={distance}>
                      {distance.toLocaleString()}
                    </option>
                  ))}
                </S.Select>
                <span>~</span>
                <S.Select
                  value={filterCondition.end_distance}
                  onChange={(e) => {
                    const newEndDistance = Number(e.target.value);
                    setFilterCondition((prev) => ({
                      ...prev,
                      // 종료 거리가 시작 거리보다 작으면 시작 거리를 종료 거리로 설정
                      start_distance: newEndDistance < prev.start_distance ? newEndDistance : prev.start_distance,
                      end_distance: newEndDistance,
                    }));
                  }}
                >
                  {Array.from({ length: 31 }, (_, i) => i * 10000).map((distance) => (
                    <option key={distance} value={distance}>
                      {distance.toLocaleString()}
                    </option>
                  ))}
                </S.Select>
                <span>km</span>
              </S.YearSelector>
            </S.Section>
            <S.Section id="price">
              <S.SectionTitle>가격</S.SectionTitle>
              <S.YearSelector>
                <S.Select
                  value={filterCondition.start_price}
                  onChange={(e) => {
                    const newStartPrice = Number(e.target.value);
                    setFilterCondition((prev) => ({
                      ...prev,
                      start_price: newStartPrice,
                      // 시작 가격이 종료 가격보다 크면 종료 가격을 시작 가격으로 설정
                      end_price: newStartPrice > prev.end_price ? newStartPrice : prev.end_price,
                    }));
                  }}
                >
                  {Array.from({ length: 11 }, (_, i) => i * 1000).map((price) => (
                    <option key={price} value={price}>
                      {price.toLocaleString()}
                    </option>
                  ))}
                </S.Select>
                <span>~</span>
                <S.Select
                  value={filterCondition.end_price}
                  onChange={(e) => {
                    const newEndPrice = Number(e.target.value);
                    setFilterCondition((prev) => ({
                      ...prev,
                      // 종료 가격이 시작 가격보다 작으면 시작 가격을 종료 가격으로 설정
                      start_price: newEndPrice < prev.start_price ? newEndPrice : prev.start_price,
                      end_price: newEndPrice,
                    }));
                  }}
                >
                  {Array.from({ length: 11 }, (_, i) => i * 1000).map((price) => (
                    <option key={price} value={price}>
                      {price.toLocaleString()}
                    </option>
                  ))}
                </S.Select>
                <span>만원</span>
              </S.YearSelector>
            </S.Section>
            <S.Section id="color">
              <S.SectionTitle>색상</S.SectionTitle>
              <S.ColorGrid>
                {COLORS.map((color, index) => (
                  <S.ColorButton
                    key={index}
                    $active={filterCondition.colors.includes(color.name)}
                    onClick={() => handleColorSelect(color.name)}
                  >
                    <S.ColorCircle
                      $color={color.color}
                      $border={color.border}
                      $active={filterCondition.colors.includes(color.name)}
                    />
                    <span>{color.name}</span>
                  </S.ColorButton>
                ))}
              </S.ColorGrid>
            </S.Section>
          </S.ScrollContent>
        </S.Content>

        <S.Footer>
          <S.ResetButton onClick={resetFilter}>초기화</S.ResetButton>
          <Button
            width="70%"
            height="48px"
            onClick={() => {
              // 필터 적용 로직
              console.log('Applied Filter:', filterCondition);
            }}
          >
            적용
          </Button>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default CarFilterPage;
