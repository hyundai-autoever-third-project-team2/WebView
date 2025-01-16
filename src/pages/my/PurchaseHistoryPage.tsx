import Toolbar from "components/common/Toolbar";
import StatMenu from "./components/StatMenu";
import { useNavigate } from "react-router-dom";
import DropDownButton from "./components/DropDownButton";
import styled from "styled-components";
import { theme } from "styles/theme";
import CarHistoryItem from "./components/CarHistoryItem";
import SearchInput from "components/common/SearchInput";

import temp from "../../assets/feed_sample.jpg"
import CarData from "components/common/CarCard";

const Contents = styled.div`
`

const SearchContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding : 15px;
    gap:8px;
    font-size: 0.9rem;
`

const CarHistoryList = styled.div`
    display: flex;
    flex-direction: column;
`

function PurchasePage() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/my')
    }


    return(
        <>
            <Toolbar showBackButton title="구매 내역" onBackClick={handleBackClick}/>
            <StatMenu items={[
                {
                    value: 0,
                    label: "거래중"
                },
                {
                    value: 0,
                    label: "거래 완료"
                },
                {
                    value: 0,
                    label: "취소 / 반품"
                },
            ]}/>
            
            <Contents>
                <SearchContainer>
                    <SearchInput/>
                    <DropDownButton/>
                </SearchContainer>

            <CarHistoryList>

                <CarHistoryItem        
                    date="2025. 01. 23"
                    status="시세 측정 중"
                    title="자동차 모델 들어갈 자리"
                    model="주문번호 A-123"
                    price="840만원"
                    monthlyPayment="월 15만원"
                    imageUrl={temp}
                    isPurchase
                    />
                <CarHistoryItem        
                    date="2025. 01. 23"
                    status="판매 처리"
                    title="자동차 모델 들어갈 자리"
                    model="주문번호 A-123"
                    price="840만원"
                    monthlyPayment="월 15만원"
                    imageUrl={temp}
                    isPurchase
                    />
                                
                <CarHistoryItem        
                    date="2025. 01. 23"
                    status="시세 측정 중"
                    title="자동차 모델 들어갈 자리"
                    model="주문번호 A-123"
                    price="840만원"
                    monthlyPayment="월 15만원"
                    imageUrl={temp}
                    isPurchase
                />
                
                <CarHistoryItem        
                    date="2025. 01. 23"
                    status="시세 측정 중"
                    title="자동차 모델 들어갈 자리"
                    model="주문번호 A-123"
                    price="840만원"
                    monthlyPayment="월 15만원"
                    imageUrl={temp}
                    isPurchase
                    />
                
                <CarHistoryItem        
                    date="2025. 01. 23"
                    status="시세 측정 중"
                    title="자동차 모델 들어갈 자리"
                    model="주문번호 A-123"
                    price="840만원"
                    monthlyPayment="월 15만원"
                    imageUrl={temp}
                    isPurchase
                    />

                <CarData 
                    imageUrl={temp}
                    title={"벤츠 E-클래스 5세대 E250 아방가르드 W213"} 
                    year={"2018년 10월"} 
                    mileage={"35,557km"} 
                    price={"1000만원"} 
                    tags={["as", "asas"]} 
                    viewCount={102}
                    postDate={new Date()}
                    showTags showCheckbox showViewDate showHeartButton/>
            </CarHistoryList>
            </Contents>
        </>
    )


}

export default PurchasePage;