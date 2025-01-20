import { CarListItemData } from 'types/CarListItemData';
import { client } from '../../utils/axiosInstance';

export const enum CarListPageType {
  DOMESTIC = 'domestic',
  FOREIGN = 'foreign',
  DISCOUNT = 'discount',
  TOP_50 = 'top50',
}

const API_ENDPOINTS: Record<CarListPageType, string> = {
  [CarListPageType.DOMESTIC]: '/car/domestic',
  [CarListPageType.FOREIGN]: '/car/abroad',
  [CarListPageType.DISCOUNT]: '/car/discount',
  [CarListPageType.TOP_50]: '/car/popularity',
};

export async function fetchCarListByType(type: CarListPageType): Promise<CarListItemData[]> {
  try {
    const endpoint = API_ENDPOINTS[type];
    const response = await client.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch car list:', error);
    throw error;
  }
}

export async function fetchRecentCarList(): Promise<CarListItemData[]> {
  try {
    const response = await client.get('/car/lately');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recent car list:', error);
    throw error;
  }
}

export async function fetchRecommenedCarList(): Promise<CarListItemData[]> {
  try {
    const response = await client.get('/user/userRecommend');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recommended car list:', error);
    throw error;
  }
}
