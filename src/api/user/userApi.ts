import { userInfo } from 'types/UserInfo';
import { client } from '../../utils/axiosInstance';

export const getUserInfo = async (): Promise<userInfo> => {
  const response = await client.get('/user/info');
  return response.data;
};
