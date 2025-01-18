import { client } from 'utils/axiosInstance';

export interface ReservationRequest {
  agencyId: number;
  time: string;
}

export interface ReservationResponse {
  reservationId: number;
  agencyId: number;
  agencyName: string;
  userId: number;
  nickname: string;
  reservationDate: string;
}

export const registerReservation = async (data: ReservationRequest): Promise<ReservationResponse> => {
  try {
    const formData = new FormData();
    formData.append('agencyId', String(data.agencyId));
    formData.append('time', data.time);

    const response = await client.post<ReservationResponse>('/reservation/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Unexpected Error:', error);
    throw error;
  }
};

export const changeCarContractStatus = async (carId: number): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('carId', String(carId));
    await client.put(`/car/contract`, formData);
  } catch (error) {
    console.error('Unexpected Error:', error);
    throw error;
  }
};
