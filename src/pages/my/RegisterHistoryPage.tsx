import Toolbar from "components/common/Toolbar";
import StatMenu from "./components/StatMenu";
import { useNavigate } from "react-router-dom";
import DropDownButton from "./components/DropDownButton";
import styled from "styled-components";
import { theme } from "styles/theme";
import CarHistoryItem from "./components/CarHistoryItem";
import SearchInput from "components/common/SearchInput";


import temp from "../../assets/feed_sample.jpg"


const Contents = styled.div`
`

const SearchContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding : 15px;
    gap:5px;
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
            <Toolbar showBackButton title="판매 내역" onBackClick={handleBackClick}/>
            <StatMenu items={[
                {
                    value: 0,
                    label: "시세 측정 중"
                },
                {
                    value: 0,
                    label: "판매 완료"
                },
                {
                    value: 0,
                    label: "취소"
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
                    />
                <CarHistoryItem        
                    date="2025. 01. 23"
                    status="시세 측정 중"
                    title="자동차 모델 들어갈 자리"
                    model="주문번호 A-123"
                    price="840만원"
                    monthlyPayment="월 15만원"
                    imageUrl={temp}
                    />
            </CarHistoryList>
            </Contents>
        </>
    )
}
export default PurchasePage;