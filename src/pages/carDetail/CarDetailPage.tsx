import Toolbar from 'components/common/Toolbar';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './CarDetailPage.style';
import Tag from 'components/common/Tag';
import { CarDetailSwiper } from './CarDetailSwiper';
import EyeIcon from 'assets/icon_eye.svg?react';
import TimeIcon from 'assets/icon_time.svg?react';
import BlackHeartIcon from 'assets/icon_blackheart.svg?react';
import DropDown from 'assets/icon_dropdown.svg?react';
import DropUp from 'assets/icon_dropup.svg?react';
import { useState } from 'react';
import Button from 'components/common/Button';

const optionList = ['네비게이션', 'HUD', '통풍시트', '열선시트', '크루즈컨트롤', '선루프', '주차보조', '차선이탈경보'];

export const CarDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <S.CarDetailWrapper>
      <Toolbar title="차량상세" showBackButton onBackClick={handleBackClick} rightButtons={['liked']} />

      <section>
        <S.SwiperWrapper>
          <CarDetailSwiper />
        </S.SwiperWrapper>

        <S.TagContainer>
          <S.TagWrapper>
            <Tag label="현대자동차" />
            <Tag label="더미2" />
          </S.TagWrapper>
          <S.CompareCarButton>차량 비교하기</S.CompareCarButton>
        </S.TagContainer>

        <S.ModelInfoWrapper>
          <S.ModelName>2022 그랜저(IG) 하이브리드 르블랑</S.ModelName>
          <S.ModelInfo>21년 07월 16,510km</S.ModelInfo>
          <S.ModelInfo>
            <S.IconWrapper>
              <TimeIcon />
            </S.IconWrapper>
            <S.InfoText>4일 전</S.InfoText>
            <S.IconWrapper>
              <EyeIcon />
            </S.IconWrapper>
            <S.InfoText>245</S.InfoText>
            <S.IconWrapper>
              <BlackHeartIcon />
            </S.IconWrapper>
            <S.InfoText>26</S.InfoText>
          </S.ModelInfo>

          <S.Price>3,390만원</S.Price>

          <S.BoxCarInfoContainer>
            <S.BoxInfoWrapper>
              <S.InfoText>연비</S.InfoText>
              <S.BoxInfoValue>2022</S.BoxInfoValue>
            </S.BoxInfoWrapper>
            <S.BoxInfoWrapper>
              <S.InfoText>사고이력</S.InfoText>
              <S.BoxInfoValue>2022</S.BoxInfoValue>
            </S.BoxInfoWrapper>
            <S.BoxInfoWrapper>
              <S.InfoText>주행거리</S.InfoText>
              <S.BoxInfoValue>2022</S.BoxInfoValue>
            </S.BoxInfoWrapper>
            <S.BoxInfoWrapper>
              <S.InfoText>운행기간</S.InfoText>
              <S.BoxInfoValue>2022</S.BoxInfoValue>
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
            <S.BasicInfoText>중형</S.BasicInfoText>
          </S.BasicInfoWrapper>
          <S.BasicInfoWrapper>
            <S.BasicInfoText>브랜드</S.BasicInfoText>
            <S.BasicInfoText>현대</S.BasicInfoText>
          </S.BasicInfoWrapper>
          <S.BasicInfoWrapper>
            <S.BasicInfoText>연식</S.BasicInfoText>
            <S.BasicInfoText>21년형</S.BasicInfoText>
          </S.BasicInfoWrapper>
          <S.BasicInfoWrapper>
            <S.BasicInfoText>연료</S.BasicInfoText>
            <S.BasicInfoText>가솔린</S.BasicInfoText>
          </S.BasicInfoWrapper>
          <S.BasicInfoWrapper>
            <S.BasicInfoText>기어변속</S.BasicInfoText>
            <S.BasicInfoText>오토</S.BasicInfoText>
          </S.BasicInfoWrapper>
          <S.BasicInfoWrapper>
            <S.BasicInfoText>연비</S.BasicInfoText>
            <S.BasicInfoText>13km/L</S.BasicInfoText>
          </S.BasicInfoWrapper>
          <S.BasicInfoWrapper>
            <S.BasicInfoText>배기량</S.BasicInfoText>
            <S.BasicInfoText>1885cc</S.BasicInfoText>
          </S.BasicInfoWrapper>
          <S.BasicInfoWrapper>
            <S.BasicInfoText>차량위치</S.BasicInfoText>
            <S.BasicInfoText>가산디지털단지 지점</S.BasicInfoText>
          </S.BasicInfoWrapper>
        </S.BaiscInfoContainer>
      </section>

      <section>
        <S.OptionContainer>
          <S.Title>주요 옵션</S.Title>
          <S.OptionGrid>
            {optionList.map((option, idx) => (
              <S.OptionWrapper key={option}>
                <S.OptionImageWrapper>
                  <S.OptionImage src={`src/assets/option${idx + 1}.png`} />
                </S.OptionImageWrapper>
                <S.OptionText>{option}</S.OptionText>
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
              이 차량은 성능점검상 <S.StatusResultColorText>무사고</S.StatusResultColorText> 입니다
            </S.StatusResultText>
          </S.StatusResult>

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
      <Button fixed>구매하기</Button>
    </S.CarDetailWrapper>
  );
};
