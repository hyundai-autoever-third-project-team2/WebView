import CarData from 'types/CarData';
import { client } from '../../utils/axiosInstance';

export async function getCarDetail(carId: number): Promise<CarData> {
  try {
    const response = await client.get<CarData>(`/car/detail`, {
      params: { carId },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch car detail:', error);
    throw error;
  }
}
