import { CarComparisonData } from "types/carDetail"
import { client } from "utils/axiosInstance"


  
export const getViewComparesCar = async (carIds: number[]) => {
  try {
      const response = await client.post<CarComparisonData[]>('/car/compares', {
          carIds: carIds
      });
      return response.data;
  } catch (error) {
      console.error('차량 비교 데이터 조회 실패:', error);
      throw error;
  }
};