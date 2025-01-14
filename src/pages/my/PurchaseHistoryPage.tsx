import Toolbar from "components/common/Toolbar";
import StatMenu from "./components/StatMenu";
import { useNavigate } from "react-router-dom";
import DropDownButton from "./components/DropDownButton";
import styled from "styled-components";
import { theme } from "styles/theme";
import CarHistoryItem from "./components/CarHistoryItem";

const Contents = styled.div`
`

const SearchContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding : 15px;
    gap:5px;
`

const TempSearchBar = styled.div`
    background-color : ${theme.colors.primary};
    width: 70%;
    height: 35px;
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
                    <TempSearchBar>gdgd</TempSearchBar>
                    <DropDownButton/>
                </SearchContainer>

                <CarHistoryItem        
                    date="2025. 01. 23"
                    status="시세 측정 중"
                    title="자동차 모델 들어갈 자리"
                    model="주문번호 A-123"
                    price="840만원"
                    monthlyPayment="월 15만원"
                    imageUrl={'차이미지'}
                />
            </Contents>
        </>
    )


}

export default PurchasePage;