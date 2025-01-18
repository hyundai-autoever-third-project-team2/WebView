import { client } from '../../utils/axiosInstance';
import { CarDetailResponse } from 'types/CarDetail';

export async function getCarDetail(carId: number) {
  try {
    const response = await client.get<CarDetailResponse>(`/car/detail`, {
      params: { carId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch car detail:', error);
    throw error;
  }
}
