import { client } from '../../utils/axiosInstance';

export const getUserInfo = async () => {
  const response = await client.get('/user/info');
  return response.data;
};
