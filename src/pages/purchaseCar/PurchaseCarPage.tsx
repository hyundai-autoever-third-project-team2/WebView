import { useReducer, useState } from 'react';
import Toolbar from 'components/common/Toolbar';
import * as S from './PurchaseCarPage.style';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';
import { ChevronDown } from 'lucide-react';
import Map from 'pages/purchaseCar/Map';
import { useUser } from 'hooks/useUser';
import { calculateRegistrationFee } from 'utils/calculateRegistrationFee';
import { PaymentReadyRequest, requestKakaoPayment } from 'api/carPurchase/kakaoPayApi';
import { registerReservation } from 'api/carPurchase/reservationApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

function PurchaseCarPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data: userInfo } = useUser();
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
  const [mapOpen, setMapOpen] = useReducer((v) => !v, false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isAllAgreed = Object.values(agreements).every((value) => value); // 모든 동의사항이 체크되었는지 확인

  const {
    carId,
    modelName,
    modelYear,
    distance,
    price: originalPrice,
    discount_price,
    image,
    agency_id,
    agency_name,
    latitude,
    longitude,
  } = state;

  const price = discount_price && discount_price !== 0 ? discount_price : originalPrice; // 할인된 가격이 있으면 할인된 가격으로 계산
  const registrationFee = calculateRegistrationFee(price); // 이전 등록비

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePayment = async () => {
    if (!selectedDate) {
      alert('방문 날짜를 선택해주세요');
      return;
    }

    const formattedDate = selectedDate.toISOString().split('.')[0];

    // 지점 방문 예약
    try {
      const reservationResult = await registerReservation({
        agencyId: agency_id,
        time: formattedDate,
      });

      console.log('예약 정보: ', reservationResult);
    } catch (error) {
      console.error('예약 등록 실패: ', error);
      window.Error('예약 등록에 실패했습니다. 다시 시도해주세요.');
    }

    localStorage.setItem('contractCarId', carId);

    try {
      // 예약이 성공하면 결제 진행
      const paymentData: PaymentReadyRequest = {
        partner_order_id: '12345',
        partner_user_id: 'user123',
        item_name: modelName,
        quantity: 1,
        total_amount: 300000,
        tax_free_amount: 0,
        approval_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/cancel`,
        fail_url: `${window.location.origin}/payment/fail`,
      };

      const response = await requestKakaoPayment(paymentData);

      // tid 값 추출
      const tid = response.tid;

      // tid 값을 로컬 스토리지에 저장
      localStorage.setItem('kakaoPayTid', tid);

      console.log('Payment preparation successful. TID:', tid);

      const redirectUrl = response.next_redirect_pc_url;

      window.location.href = redirectUrl;
      console.log('Payment response:', response);
    } catch (error) {
      console.error('Payment or Reservation failed:', error);
    }
  };

  return (
    <>
      <Toolbar title="계약" showBackButton onBackClick={() => navigate(-1)} />
      <S.PurchaseCarPageContainer>
        <S.ContractorInfoSection>
          <S.SectionTitle>주문자 정보</S.SectionTitle>
          <S.ContractorName>{userInfo?.nickname}</S.ContractorName>
        </S.ContractorInfoSection>

        <S.SectionGap />

        <S.CarInfoSection $isOpen={carDetailOpen} onClick={setCarDetailOpen}>
          <S.SectionTitle>차량 정보</S.SectionTitle>
          <S.CarInfoRightWrapper>
            {!carDetailOpen && <S.CarModelName>{modelName}</S.CarModelName>}
            <ChevronDown />
          </S.CarInfoRightWrapper>
        </S.CarInfoSection>

        {carDetailOpen && (
          <>
            <S.CarInfoDetailSection>
              <S.CarInfoDetailImage src={image}></S.CarInfoDetailImage>
              <S.CarInfoDetailContent>
                <S.CarModelName>{modelName}</S.CarModelName>
                <S.CarInfoYearAndDistance>
                  {modelYear}년식 {distance}km
                </S.CarInfoYearAndDistance>
                <S.CarInfoPrice>{(price * 10000).toLocaleString()}원</S.CarInfoPrice>
              </S.CarInfoDetailContent>
            </S.CarInfoDetailSection>
          </>
        )}

        <S.SectionGap />

        <S.CarInfoSection $isOpen={mapOpen} onClick={setMapOpen}>
          <S.SectionTitle>수령 위치</S.SectionTitle>
          <S.CarInfoRightWrapper>
            {!mapOpen && <S.CarModelName>{agency_name}</S.CarModelName>}
            <ChevronDown />
          </S.CarInfoRightWrapper>
        </S.CarInfoSection>

        {mapOpen && (
          <>
            <Map latitude={latitude} longitude={longitude} />
          </>
        )}

        <S.SectionGap />

        <S.ContractPriceSection>
          <S.SectionTitle>주문금액</S.SectionTitle>
          <S.CarPriceWrapper>
            <S.CarPriceTitle>차량 주문금액</S.CarPriceTitle>
            <S.CarPrice>{(price * 10000).toLocaleString()}원</S.CarPrice>
          </S.CarPriceWrapper>
          <S.TotalPriceWrapper>
            <S.CarPriceWrapper>
              <S.CarPriceTitle>총 차량 주문금액</S.CarPriceTitle>
              <S.CarPrice>{(price * 10000).toLocaleString()}원</S.CarPrice>
            </S.CarPriceWrapper>
            <S.CarPriceWrapper>
              <S.CarPriceTitle>이전 등록비</S.CarPriceTitle>
              <S.CarPrice>{(registrationFee * 10000).toLocaleString()}원</S.CarPrice>
            </S.CarPriceWrapper>
            <S.HighlightedCarPriceWrapper>
              <S.CarPriceTitle>예상 총 주문금액</S.CarPriceTitle>
              <S.CarPrice>{(price * 10000 + registrationFee * 10000).toLocaleString()}원</S.CarPrice>
            </S.HighlightedCarPriceWrapper>
          </S.TotalPriceWrapper>
        </S.ContractPriceSection>

        <S.SectionGap />

        <S.DownPaymentSection>
          <S.SectionTitle>계약금액</S.SectionTitle>
          <S.ContractorName>300,000원</S.ContractorName>
        </S.DownPaymentSection>

        <S.SectionGap />

        <S.ReservationSection>
          <S.SectionTitle>방문 예약</S.SectionTitle>
          <S.DatePickerWrapper>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy년 MM월 dd일"
              minDate={new Date(new Date().getTime() + 48 * 60 * 60 * 1000)} // 현재 날짜로부터 +2일 이후부터 예약 가능
              placeholderText="방문 날짜를 선택해주세요"
              locale={ko}
              showPopperArrow={false}
              customInput={<S.DateInput />}
            />
          </S.DatePickerWrapper>
        </S.ReservationSection>

        <S.SectionGap />

        <S.AgreementSection>
          <S.SectionTitle>구매 필수 확인사항 · 동의</S.SectionTitle>
          <S.SectionSubtitle>구매 전 필수 사항을 모두 확인하고, 동의하셔야 계약이 진행됩니다.</S.SectionSubtitle>
          <S.AgreementCheckboxContainer>
            <S.AgreementCheckboxWrapper onClick={() => handleAgreementChange('carInfo')}>
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

            <S.AgreementCheckboxWrapper onClick={() => handleAgreementChange('inspection')}>
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

            <S.AgreementCheckboxWrapper onClick={() => handleAgreementChange('contract')}>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.contract}
                onChange={() => handleAgreementChange('contract')}
              />
              <S.AgreementCheckboxDescription>[필수] 계약조항 및 환불약관 내용 확인</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>

            <S.AgreementCheckboxWrapper onClick={() => handleAgreementChange('payment')}>
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
            <S.AgreementCheckboxWrapper onClick={() => handleAgreementChange('privateInfo')}>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.privateInfo}
                onChange={() => handleAgreementChange('privateInfo')}
              />
              <S.AgreementCheckboxDescription>[필수] 개인정보 수집 및 이용 동의</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>

            <S.AgreementCheckboxWrapper onClick={() => handleAgreementChange('privateInfoThirdParty')}>
              <S.AgreementCheckbox
                type="checkbox"
                checked={agreements.privateInfoThirdParty}
                onChange={() => handleAgreementChange('privateInfoThirdParty')}
              />
              <S.AgreementCheckboxDescription>[필수] 개인정보 제3자 제공에 대한 동의</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>

            <S.AgreementCheckboxWrapper onClick={() => handleAgreementChange('uniqueInfoThirdParty')}>
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
          <Button disabled={!isAllAgreed} onClick={handlePayment}>
            계약금 결제하기
          </Button>
        </S.ButtonSection>
      </S.PurchaseCarPageContainer>
    </>
  );
}

export default PurchaseCarPage;
