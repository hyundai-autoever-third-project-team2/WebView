import axios from 'axios';
import { CarListItemData } from 'types/CarListItemData';
import { CarFilterCondition } from 'types/Filter';
import { client } from 'utils/axiosInstance';

export async function searchCars(keyword: string): Promise<CarListItemData[]> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('searchCar', keyword);

    const response = await client.get('/car/search', {
      params: searchParams,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to search cars:', error);
    throw error;
  }
}

export const getFilteredCarList = async (filterCondition: CarFilterCondition) => {
  try {
    const response = await axios({
      method: 'get',
      url: '/car/filter',
      data: JSON.stringify(filterCondition),
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch filtered cars:', error);
    throw error;
  }
};
