import Toolbar from "components/common/Toolbar";
import { useNavigate } from "react-router-dom";
import CompareCarData from "./CompareCarData";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
    padding-top: 70px;
    overflow-x: auto;
    display: flex;
`

const tempCarData = {
  carInfo: {
    id: 1,
    year: 2022,
    model: "그랜저(IG) 하이브리드 르블랑",
    price: 3390,
    monthlyPayment: 56,
    downPaymentPercent: 30,
    term: 48,
    interestRate: 7,
  },
  specs: {
    year: "2년형",
    mileage: "13km/L",
    distance: "10,1236km",
    engineSize: "2,359cc",
    color: "화이트",
    trim: "하이브리드",
    transmission: "색상",
    fuelType: "오토"
  },
  options: [
    { name: "네비게이션", isChecked: true },
    { name: "헤드업 디스플레이", isChecked: true },
    { name: "열선시트(1열)", isChecked: true },
    { name: "열선시트(1열/2열)", isChecked: true },
    { name: "크루즈 컨트롤", isChecked: false },
    { name: "선루프", isChecked: true },
    { name: "전방 주차거리 경고", isChecked: true },
    { name: "차선 이탈 경보", isChecked: false }
  ]
};
const initialCarDataList = Array(4).fill(null).map((_, index) => ({
  ...tempCarData,
  carInfo: { ...tempCarData.carInfo, id: index + 1 }
}));


function ComparePage(){
  const [carDataList, setCarDataList] = useState(initialCarDataList);
  const navigate = useNavigate()
  
  
  const handleBackClick = () => {
        navigate(-1)
  }

  const handleCloseButtonClick = (id : number) => {
    setCarDataList(prevList => prevList.filter(car => car.carInfo.id !== id));
  }

  const handleDetailButtonClick = (id : number) => {
    navigate(`/car-detail/${id}`) //맞나확인
  }

  return(
      <>
       <Toolbar title="비교하기" showBackButton onBackClick={handleBackClick}/>
           
       <Container>
        {carDataList.map((carData) => (
         <CompareCarData 
           key={carData.carInfo.id}
           carInfo={carData.carInfo}
           specs={carData.specs}
           options={carData.options}
           onClose={() => handleCloseButtonClick(carData.carInfo.id)}
           onDetail={() => handleDetailButtonClick(carData.carInfo.id)}
         />
        ))}
      </Container>
    </>
  )
}

export default ComparePage;