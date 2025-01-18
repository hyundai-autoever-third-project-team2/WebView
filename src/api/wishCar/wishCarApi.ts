import { client } from 'utils/axiosInstance';

export const addWishCar = async (carId: number) => {
  const formData = new FormData();
  formData.append('carId', carId.toString());
  const response = await client.post('/car/isLiked', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteWishCar = async (carId: number) => {
  const response = await client.delete('/car/unLiked', {
    params: { carId },
  });
  if (response.status === 200) {
    console.log('Success to delete wish car');
  }
  return response.data;
};
