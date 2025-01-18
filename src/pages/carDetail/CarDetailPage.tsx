import Toolbar from 'components/common/Toolbar';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './CarDetailPage.style';
import Tag from 'components/common/Tag';
import { CarDetailSwiper, CarFixedSwiper } from './CarDetailSwiper';
import EyeIcon from 'assets/icon_eye.svg?react';
import TimeIcon from 'assets/icon_time.svg?react';
import BlackHeartIcon from 'assets/icon_blackheart.svg?react';
import DropDown from 'assets/icon_dropdown.svg?react';
import DropUp from 'assets/icon_dropup.svg?react';
import { useEffect, useState } from 'react';
import Button from 'components/common/Button';
import RightIcon from 'assets/icon_right_button_primary.svg?react';
import { useQuery } from '@tanstack/react-query';
import { queries } from 'queries';
import Loading from 'components/common/Loading';
import { getElapsedTime } from 'utils/getElapsedTime';
import option1 from 'assets/option1.png';
import option2 from 'assets/option2.png';
import option3 from 'assets/option3.png';
import option4 from 'assets/option4.png';
import option5 from 'assets/option5.png';
import option6 from 'assets/option6.png';
import option7 from 'assets/option7.png';
import option8 from 'assets/option8.png';

export const CarDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { data, isLoading } = useQuery({ ...queries.car.detail(Number(id)) });
  const navigate = useNavigate();

  useEffect(() => {
    const recentCarList = localStorage.getItem('recentCarList');
    const recentCarListArray = recentCarList ? JSON.parse(recentCarList) : [];
    const removedArray = recentCarListArray.filter((item: number) => item !== Number(id));
    if (removedArray.length >= 5) {
      removedArray.shift();
    }
    removedArray.push(Number(id));
    localStorage.setItem('recentCarList', JSON.stringify(removedArray));
  }, []);

  const handleCompareCarClick = () => {
    navigate(`/select-compare`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePurchaseClick = () => {
    navigate('/purchase', {
      state: {
        carId: data?.carId,
        modelName: data?.model_name,
        modelYear: data?.model_year,
        distance: data?.distance,
        price: data?.price,
        discount_price: data?.discount_price,
        image: data?.carImages[0],
        agency_id: data?.agency_id,
        agency_name: data?.agency_name,
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    const optionList = [
      { name: '네비게이션', value: data.navigation, image: option1 },
      { name: 'HUD', value: data.hud, image: option2 },
      { name: '통풍시트', value: data.ventilated_seat, image: option3 },
      { name: '열선시트', value: data.heated_seat, image: option4 },
      { name: '크루즈컨트롤', value: data.cruise_control, image: option5 },
      { name: '선루프', value: data.sunroof, image: option6 },
      { name: '주차보조', value: data.parking_distance_warning, image: option7 },
      { name: '차선이탈경보', value: data.line_out_warning, image: option8 },
    ];
    return (
      <S.CarDetailWrapper>
        <Toolbar
          title="차량상세"
          showBackButton
          onBackClick={handleBackClick}
          rightButtons={['liked']}
          carId={Number(id)}
        />

        <section>
          <S.SwiperWrapper>
            <CarDetailSwiper carImages={data.carImages} />
          </S.SwiperWrapper>

          <S.TagContainer>
            <S.TagWrapper>
              <Tag label="프리미엄" />
              <Tag label="인증" />
              <Tag label={data.brand} />
            </S.TagWrapper>

            <S.CompareCarButtonWrapper>
              <S.CompareCarButton onClick={handleCompareCarClick}>차량 비교하기</S.CompareCarButton>
              <RightIcon />
            </S.CompareCarButtonWrapper>
          </S.TagContainer>

          <S.ModelInfoWrapper>
            <S.ModelName>{data.model_name}</S.ModelName>
            <S.ModelInfo>
              {data.model_year} {data.distance}km
            </S.ModelInfo>
            <S.ModelInfo>
              <S.IconWrapper>
                <TimeIcon />
              </S.IconWrapper>
              <S.InfoText>{getElapsedTime(data.created_at)}</S.InfoText>
              <S.IconWrapper>
                <EyeIcon />
              </S.IconWrapper>
              <S.InfoText>{data.view_count}</S.InfoText>
              <S.IconWrapper>
                <BlackHeartIcon />
              </S.IconWrapper>
              <S.InfoText>{data.like_count}</S.InfoText>
            </S.ModelInfo>

            <S.Price>
              {data.discount_price === 0 ? data.price.toLocaleString() : data.discount_price.toLocaleString()}만원
            </S.Price>

            <S.BoxCarInfoContainer>
              <S.BoxInfoWrapper>
                <S.InfoText>연비</S.InfoText>
                <S.BoxInfoValue>{data.fuel_efficiency}km</S.BoxInfoValue>
              </S.BoxInfoWrapper>
              <S.BoxInfoWrapper>
                <S.InfoText>사고이력</S.InfoText>
                <S.BoxInfoValue>{data.fixedImages.length === 0 ? '없음' : '있음'}</S.BoxInfoValue>
              </S.BoxInfoWrapper>
              <S.BoxInfoWrapper>
                <S.InfoText>주행거리</S.InfoText>
                <S.BoxInfoValue>{data.distance}km</S.BoxInfoValue>
              </S.BoxInfoWrapper>
              <S.BoxInfoWrapper>
                <S.InfoText>운행기간</S.InfoText>
                <S.BoxInfoValue>3년</S.BoxInfoValue>
              </S.BoxInfoWrapper>
            </S.BoxCarInfoContainer>

            <S.DistStandardWrapper onClick={() => setIsOpen((prev) => !prev)}>
              <S.FlexDiv>
                <div>{isOpen ? <DropUp /> : <DropDown />}</div>
                <span>주행거리 기준</span>
              </S.FlexDiv>
              {isOpen && (
                <S.DistStandardInfoBox>
                  <S.DistStandardText>0 ~ 20,000km : 적음</S.DistStandardText>
                  <S.DistStandardText>20,001 ~ 40,000km : 다소 적음</S.DistStandardText>
                  <S.DistStandardText>40,001 ~ 60,000km : 보통</S.DistStandardText>
                  <S.DistStandardText>60,001 ~ 80,000km : 다소 없음</S.DistStandardText>
                  <S.DistStandardText>100,000km ~ : 많음</S.DistStandardText>
                </S.DistStandardInfoBox>
              )}
            </S.DistStandardWrapper>
          </S.ModelInfoWrapper>
        </section>

        <section>
          <S.BaiscInfoContainer>
            <S.Title>기본 정보</S.Title>
            <S.BasicInfoWrapper>
              <S.BasicInfoText>차종</S.BasicInfoText>
              <S.BasicInfoText>{data.car_type}</S.BasicInfoText>
            </S.BasicInfoWrapper>
            <S.BasicInfoWrapper>
              <S.BasicInfoText>브랜드</S.BasicInfoText>
              <S.BasicInfoText>{data.brand}</S.BasicInfoText>
            </S.BasicInfoWrapper>
            <S.BasicInfoWrapper>
              <S.BasicInfoText>연식</S.BasicInfoText>
              <S.BasicInfoText>{data.model_year}</S.BasicInfoText>
            </S.BasicInfoWrapper>
            <S.BasicInfoWrapper>
              <S.BasicInfoText>연료</S.BasicInfoText>
              <S.BasicInfoText>{data.fuel}</S.BasicInfoText>
            </S.BasicInfoWrapper>
            <S.BasicInfoWrapper>
              <S.BasicInfoText>기어변속</S.BasicInfoText>
              <S.BasicInfoText>{data.gear}</S.BasicInfoText>
            </S.BasicInfoWrapper>
            <S.BasicInfoWrapper>
              <S.BasicInfoText>연비</S.BasicInfoText>
              <S.BasicInfoText>{data.fuel_efficiency}km/l</S.BasicInfoText>
            </S.BasicInfoWrapper>
            <S.BasicInfoWrapper>
              <S.BasicInfoText>배기량</S.BasicInfoText>
              <S.BasicInfoText>{data.displacement}cc</S.BasicInfoText>
            </S.BasicInfoWrapper>
            <S.BasicInfoWrapper>
              <S.BasicInfoText>차량위치</S.BasicInfoText>
              <S.BasicInfoText>{data.agency_name}</S.BasicInfoText>
            </S.BasicInfoWrapper>
          </S.BaiscInfoContainer>
        </section>

        <section>
          <S.OptionContainer>
            <S.Title>주요 옵션</S.Title>
            <S.OptionGrid>
              {optionList.map((option) => (
                <S.OptionWrapper key={option.name} $isActive={option.value}>
                  <S.OptionImageWrapper>
                    <S.OptionImage src={option.image} />
                  </S.OptionImageWrapper>
                  <S.OptionText>{option.name}</S.OptionText>
                </S.OptionWrapper>
              ))}
            </S.OptionGrid>
          </S.OptionContainer>
        </section>

        <section>
          <S.StausWrapper>
            <S.Title>성능 상태</S.Title>
            <S.StatusResult>
              <S.StatusResultText>
                이 차량은 성능점검상{' '}
                <S.StatusResultColorText>{data.fixedImages.length === 0 ? '무사고' : '유사고'}</S.StatusResultColorText>{' '}
                입니다
              </S.StatusResultText>
            </S.StatusResult>

            {data.fixedImages.length > 0 && (
              <S.SwiperWrapper>
                <CarFixedSwiper fixedImages={data.fixedImages} />
              </S.SwiperWrapper>
            )}

            <S.BoxCarInfoContainer>
              <S.BoxStatusInfo>
                <S.InfoText>침수여부</S.InfoText>
                <S.BoxInfoValue>없음</S.BoxInfoValue>
              </S.BoxStatusInfo>
              <S.BoxStatusInfo>
                <S.InfoText>불법구조변경</S.InfoText>
                <S.BoxInfoValue>없음</S.BoxInfoValue>
              </S.BoxStatusInfo>
              <S.BoxStatusInfo>
                <S.InfoText>주요장치상태</S.InfoText>
                <S.BoxInfoValue>좋음</S.BoxInfoValue>
              </S.BoxStatusInfo>
            </S.BoxCarInfoContainer>
          </S.StausWrapper>
        </section>

        <section>
          <S.SimilarCarWrapper>
            <S.Title>인기있는 비슷한 차량</S.Title>
            <S.SimilarCarFlexRow>
              <S.SimilarCarFlexColumn>
                <S.SimilarCarImageWrapper>
                  <S.SimilarImage src="https://imgsc.chutcha.kr/files/car_resist/202412/29/2024122911065817354380182231_ori.jpg?s=480x360&t=crop" />
                </S.SimilarCarImageWrapper>
                <S.SimilarCarTitle>2022 그랜저(IG) 하이브리드 르블랑</S.SimilarCarTitle>
                <S.SimilarCarPrice>3,000만원</S.SimilarCarPrice>
              </S.SimilarCarFlexColumn>
              <S.SimilarCarFlexColumn>
                <S.SimilarCarImageWrapper>
                  <S.SimilarImage src="https://imgsc.chutcha.kr/files/car_resist/202412/29/2024122911065817354380182231_ori.jpg?s=480x360&t=crop" />
                </S.SimilarCarImageWrapper>
                <S.SimilarCarTitle>2022 그랜저(IG) 하이브리드 르블랑</S.SimilarCarTitle>
                <S.SimilarCarPrice>3,000만원</S.SimilarCarPrice>
              </S.SimilarCarFlexColumn>
              <S.SimilarCarFlexColumn>
                <S.SimilarCarImageWrapper>
                  <S.SimilarImage src="https://imgsc.chutcha.kr/files/car_resist/202412/29/2024122911065817354380182231_ori.jpg?s=480x360&t=crop" />
                </S.SimilarCarImageWrapper>
                <S.SimilarCarTitle>2022 그랜저(IG) 하이브리드 르블랑</S.SimilarCarTitle>
                <S.SimilarCarPrice>3,000만원</S.SimilarCarPrice>
              </S.SimilarCarFlexColumn>
            </S.SimilarCarFlexRow>
          </S.SimilarCarWrapper>
        </section>
        <Button $fixed onClick={handlePurchaseClick}>
          구매하기
        </Button>
      </S.CarDetailWrapper>
    );
  }
};
