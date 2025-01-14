import { client } from 'utils/axiosInstance';

export interface IRegisterCarData {
  car_number: string;
  comments: string;
  images: string[];
}

export const fetchRegisterCar = async (data: IRegisterCarData) => await client.post('/car/registration', data);

export const fetchUploadImage = async (data: FormData) =>
  await client.post<string>('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
