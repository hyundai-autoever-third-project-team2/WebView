import { IServeyData } from 'types/Survey';
import { client } from 'utils/axiosInstance';

export async function submitSurvey(surveyData: IServeyData | {}) {
  try {
    const response = await client.post('/user/survey', surveyData);
    if (response.status === 200) {
      console.log('설문제출 완료');
    }
  } catch (error) {
    console.error('설문제출 실패', error);
    throw error;
  }
}
