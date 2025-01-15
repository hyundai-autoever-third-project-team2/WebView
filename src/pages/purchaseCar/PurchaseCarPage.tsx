import Toolbar from 'components/common/Toolbar';
import * as S from './PurchaseCarPage.style';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';

function PurchaseCarPage() {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar title="계약" showBackButton onBackClick={() => navigate(-1)} />
      <S.PurchaseCarPageContainer>
        <S.ContractorInfoSection>
          <S.SectionTitle>주문자 정보</S.SectionTitle>
          <S.ContractorName>전우정</S.ContractorName>
        </S.ContractorInfoSection>

        <S.SectionGap />

        <S.CarInfoSection>
          <S.SectionTitle>차량 정보</S.SectionTitle>
          <S.CarModelName>2022 그랜저(IG) 하이브리드 르블랑</S.CarModelName>
        </S.CarInfoSection>

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
              <S.AgreementCheckbox type="checkbox" />
              <S.AgreementCheckboxDescription>
                [필수] 차량의 정보와 주문 및 고지사항 안내 확인
                <S.AgreementCheckboxSubtext>
                  차량의 옵션과 상세정보, 주문 전 확인사항 안내 드린 '품질 개선을 진행하지 않은 항목(사진포함)'을
                  확인하고 구매합니다.
                </S.AgreementCheckboxSubtext>
              </S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>
            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox type="checkbox" />
              <S.AgreementCheckboxDescription>
                [필수] 성능상태 점검기록부, 점검 리포트 확인 성능ㆍ상태점검기록부, 점검 항목 진단 리포트 내용을
                확인했습니다.
                <S.AgreementCheckboxSubtext>
                  성능ㆍ상태점검기록부, 점검 항목 진단 리포트 내용을 확인했습니다.
                </S.AgreementCheckboxSubtext>
              </S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>
            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox type="checkbox" />
              <S.AgreementCheckboxDescription>[필수] 계약조항 및 환불약관 내용 확인</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>
            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox type="checkbox" />
              <S.AgreementCheckboxDescription>[필수] 계약금 결제전 중요 안내 사항 확인</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>
            <S.AgreementCheckboxWrapper>
              <S.AgreementCheckbox type="checkbox" />
              <S.AgreementCheckboxDescription>[필수] 일괄서명 동의 안내</S.AgreementCheckboxDescription>
            </S.AgreementCheckboxWrapper>
          </S.AgreementCheckboxContainer>
        </S.AgreementSection>

        <S.SectionGap />

        <S.AgreementSection>
          <S.SectionTitle>개인정보 수집 · 이용 · 제공 동의</S.SectionTitle>
        </S.AgreementSection>

        <S.ButtonSection>
          <Button>계약금 결제하기</Button>
        </S.ButtonSection>
      </S.PurchaseCarPageContainer>
    </>
  );
}

export default PurchaseCarPage;
