import { userInfo } from 'types/userInfo';
import { client } from '../../utils/axiosInstance';

export const getUserInfo = async (): Promise<userInfo> => {
  const response = await client.get('/user/info');
  return response.data;
};

export const updateUserProfileImage = async (profileImage : string) => {
  const response = await client.put('/user/update/profile', profileImage);
  return response.data;
}

export const updateUserNickName = async (nickname : string) => {
  const response = await client.put('/user/update/nickname', nickname);
  return response.data;
}