import { useReducer, useState } from 'react';
import Toolbar from 'components/common/Toolbar';
import * as S from './PurchaseCarPage.style';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';
import { ChevronDown } from 'lucide-react';
import FeedSample from 'assets/feed_sample.jpg';
import MapTest from 'pages/map/MapTest';

function PurchaseCarPage() {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    carInfo: false,
    inspection: false,
    contract: false,
    payment: false,
    privateInfo: false,
    privateInfoThirdParty: false,
    uniqueInfoThirdParty: false,
  });
  const [carDetailOpen, setCarDetailOpen] = useReducer((v) => !v, false);

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isAllAgreed = Object.values(agreements).every((value) => value);

  return (
    <>
      <Toolbar title="계약" showBackButton onBackClick={() => navigate(-1)} />
      <S.PurchaseCarPageContainer>
        <S.ContractorInfoSection>
          <S.SectionTitle>주문자 정보</S.SectionTitle>
          <S.ContractorName>전우정</S.ContractorName>
        </S.ContractorInfoSection>

        <S.SectionGap />

        <S.CarInfoSection $isOpen={carDetailOpen} onClick={setCarDetailOpen}>
          <S.SectionTitle>차량 정보</S.SectionTitle>
          <S.CarInfoRightWrapper>
            {!carDetailOpen && <S.CarModelName>2022 그랜저(IG) 하이브리드 르블랑</S.CarModelName>}
            <ChevronDown />
          </S.CarInfoRightWrapper>
        </S.CarInfoSection>

        {carDetailOpen && (
          <>
          <S.CarInfoDetailSection>
          <S.CarInfoDetailImage src={FeedSample}></S.CarInfoDetailImage>
          <S.CarInfoDetailContent>
            <S.CarModelName>2022 그랜저(IG) 하이브리드 르블랑</S.CarModelName>
            <S.CarInfoYearAndDistance>2022년식 0km</S.CarInfoYearAndDistance>
            <S.CarInfoPrice>4,000만원</S.CarInfoPrice>
          </S.CarInfoDetailContent>
          
        </S.CarInfoDetailSection>
        <MapTest/></>
      )}
    
          

        <S.SectionGap />

        <S.ContractPriceSection>
          <S.SectionTitle>주문금액</S.SectionTitle>
          <S.CarPriceWrapper>
            <S.CarPriceTitle>차량 주문금액</S.CarPriceTitle>
            <S.CarPrice>40,000,000원</S.CarPrice>
          </S.CarPriceWrapper>
          <S.TotalPriceWrapper>
            <S.CarPriceWrapper>
              <S.CarPriceTitle>총 차량 주문금액</S.CarPriceTitle>
              <S.CarPrice>40,000,000원</S.CarPrice>
            </S.CarPriceWrapper>
            <S.CarPriceWrapper>
              <S.CarPriceTitle>이전 등록비</S.CarPriceTitle>
              <S.CarPrice>2,624,100원</S.CarPrice>
            </S.CarPriceWrapper>
            <S.HighlightedCarPriceWrapper>
              <S.CarPriceTitle>예상 총 주문금액</S.CarPriceTitle>
              <S.CarPrice>42,624,100원</S.CarPrice>
            </S.HighlightedCarPriceWrapper>
          </S.TotalPriceWrapper>
        </S.ContractPriceSection>

        <S.SectionGap />

        <S.DownPaymentSection>
          <S.SectionTitle>계약금액</S.SectionTitle>
          <S.ContractorName>300,000원</S.ContractorName>
        </S.DownPaymentSection>

        <S.SectionGap />

        <S.AgreementSection>
          <S.SectionTitle>구매 필수 확인사항 · 동의</S.SectionTitle>
          <S.SectionSubtitle>구매 전 필수 사항을 모두 확인하고, 동의하셔야 계약이 진행됩니다.</S.SectionSubtitle>
          <S.AgreementCheckboxContainer>
            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.carInfo}
                onChange={() => handleAgreementChange('carInfo')}
              />
              <S.AgreementCheckboxDescription>
                [필수] 차량의 정보와 주문 및 고지사항 안내 확인
                <S.AgreementCheckboxSubtext>
                  차량의 옵션과 상세정보, 주문 전 확인사항 안내 드린 &apos;품질 개선을 진행하지 않은
                  항목(사진포함)&apos;을 확인하고 구매합니다.
                </S.AgreementCheckboxSubtext>
              </S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>

            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.inspection}
                onChange={() => handleAgreementChange('inspection')}
              />
              <S.AgreementCheckboxDescription>
                [필수] 성능상태 점검기록부, 점검 리포트 확인
                <S.AgreementCheckboxSubtext>
                  성능ㆍ상태점검기록부, 점검 항목 진단 리포트 내용을 확인했습니다.
                </S.AgreementCheckboxSubtext>
              </S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>

            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.contract}
                onChange={() => handleAgreementChange('contract')}
              />
              <S.AgreementCheckboxDescription>[필수] 계약조항 및 환불약관 내용 확인</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>

            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.payment}
                onChange={() => handleAgreementChange('payment')}
              />
              <S.AgreementCheckboxDescription>[필수] 계약금 결제전 중요 안내 사항 확인</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>
          </S.AgreementCheckboxContainer>
        </S.AgreementSection>

        <S.SectionGap />

        <S.AgreementSection>
          <S.SectionTitle>개인정보 수집 · 이용 · 제공 동의</S.SectionTitle>
          <S.AgreementCheckboxContainer>
            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.privateInfo}
                onChange={() => handleAgreementChange('privateInfo')}
              />
              <S.AgreementCheckboxDescription>[필수] 개인정보 수집 및 이용 동의</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>

            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.privateInfoThirdParty}
                onChange={() => handleAgreementChange('privateInfoThirdParty')}
              />
              <S.AgreementCheckboxDescription>[필수] 개인정보 제3자 제공에 대한 동의</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>

            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.uniqueInfoThirdParty}
                onChange={() => handleAgreementChange('uniqueInfoThirdParty')}
              />
              <S.AgreementCheckboxDescription>[필수] 고유식별정보 제3자 제공 동의</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>
          </S.AgreementCheckboxContainer>
        </S.AgreementSection>

        <S.ButtonSection>
          <Button disabled={!isAllAgreed}>계약금 결제하기</Button>
        </S.ButtonSection>
      </S.PurchaseCarPageContainer>
    </>
  );
}

export default PurchaseCarPage;
