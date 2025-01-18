import { useState, useEffect } from "react";
import Toolbar from "components/common/Toolbar";
import { useNavigate } from "react-router-dom";
import CompareCarData from "./CompareCarData";
import styled from "styled-components";
import { getViewComparesCar } from "api/carCompare/carCompareApi";
import { CarComparisonData } from "types/carDetail";

const Container = styled.div`
    padding-top: 70px;
    overflow-x: auto;
    display: flex;
`

function ComparePage() {
  const [carDataList, setCarDataList] = useState<CarComparisonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompareData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const carIdsToCompare = [4, 6]; 
        const compareData = await getViewComparesCar([4,6]);
        setCarDataList(compareData);
      } catch (err) {
        setError('차량 비교 데이터를 불러오는데 실패했습니다.');
        console.error('비교 데이터 로딩 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompareData();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCloseButtonClick = (carId: number) => {
    setCarDataList(prevList => prevList.filter(car => car.carId !== carId));
  };

  const handleDetailButtonClick = (carId: number) => {
    navigate(`/car-detail/${carId}`);
  };

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Toolbar title="비교하기" showBackButton onBackClick={handleBackClick}/>
      <Container>
        {carDataList.map((carData) => (
          <CompareCarData 
            key={carData.carId}
            carInfo={{
              id: carData.carId,
              year: carData.model_year,
              model: `${carData.brand} ${carData.model_name}`,
              price: carData.price,
              monthlyPayment: Math.round(carData.price / (36 * 10000)), 
              downPaymentPercent: 0,
              term:0,
              interestRate:0,
              imageUrl:carData.carImages[0],
            }}
            specs={{
              year: carData.model_year,
              mileage: `${carData.fuel_efficiency}km/L`,
              distance: `${carData.distance.toLocaleString()}km`,
              engineSize: `${carData.displacement}cc`,
              color: carData.color,
              trim: carData.car_type,
              transmission: carData.gear,
              fuelType: carData.fuel
            }}
            options={[
              { name: "네비게이션", isChecked: carData.navigation },
              { name: "헤드업 디스플레이", isChecked: carData.hud },
              { name: "열선시트", isChecked: carData.heated_seat },
              { name: "통풍시트", isChecked: carData.ventilated_seat },
              { name: "크루즈 컨트롤", isChecked: carData.cruise_control },
              { name: "선루프", isChecked: carData.sunroof },
              { name: "전방 주차거리 경고", isChecked: carData.parking_distance_warning },
              { name: "차선 이탈 경보", isChecked: carData.line_out_warning }
            ]}
            onClose={() => handleCloseButtonClick(carData.carId)}
            onDetail={() => handleDetailButtonClick(carData.carId)}
          />
        ))}
      </Container>
    </>
  );
}

export default ComparePage;