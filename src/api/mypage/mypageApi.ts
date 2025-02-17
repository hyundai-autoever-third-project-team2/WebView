import { CarListItemData } from 'types/CarListItemData';
import UserCountingData from 'types/UserCountingData';
import { CarViewTransactionData, CarViewTransactionListResponse, CarViewUserCarTransactionData, CarViewUserCarTransactionListResponse } from 'types/ViewTransactionData';
import { client } from 'utils/axiosInstance';


// (유저입장)구매내역 데이터 가져오기
export const fetchViewTransactionList = async (): Promise<CarViewTransactionData[]> => {
  try {
      const response = await client.get<CarViewTransactionListResponse>('/user/transaction');
      return response.data;
  } catch (e) {
      console.error('구매내역 데이터 가져오기 실패', e);
      throw e;
  }
}


// (유저입장)판매내역 데이터 가져오기
export const fetchViewUserCarTransactionList = async (): Promise<CarViewUserCarTransactionData[]> => {
    try{
        const response = await client.get<CarViewUserCarTransactionListResponse>('/user/userCarTransaction');
        return response.data;
    } catch(e){
        console.error('판매내역 데이터 가져오기 실패',e);
        throw e;
    }
}


// 판매내역, 구매내역, 찜 갯수 세기
export const fetchCountingList = async () : Promise<UserCountingData> =>{
  try{
    const response = await client.get<UserCountingData>('/user/userCounting');
    return response.data;
    } catch(e){
      console.error('유저 카운팅 데이터 가져오기 실패',e)
      throw e;
  }
}

// 판매내역 갱신 인터페이스스
interface UpdatePurchaseCarData {
    car_purchase_id: number;
    progress: string;
  }

  export const updatePurchaseCar = async (data: UpdatePurchaseCarData): Promise<void> => {
    try {
      const response = await client.put('/car/updatePurchaseCar', null, {
        params: {
          car_purchase_id: data.car_purchase_id,
          progress: data.progress
        }
      });
      console.log('판매내역 갱신 성공', response.data);
    } catch (e) {
      console.error('판매내역 상태 갱신 실패', e);
    }
  };
  
  //찜한 차량 데이터 가져오기
  export const fetchViewIsHeartCarList = async () : Promise<CarListItemData[]> => {
    try {
      const response = await client.get('/user/isHeartCar')
  
      return response.data;
    } catch(e){
      console.error("찜한차량 데이터 가져오기 실패", e);
      throw e;
    }
  }
  
  
  
  interface userCountingData {
    purchaseCount:number,
    saleCount:number,
    heartCount:number
  }
  
  //구매내역,판매내역,찜하기 개수 카운팅
  export const fetchUserCountingData = async () : Promise<userCountingData> => {
    try {
      const response = await client.get('/user/userCounting')
  
      return response.data;
    } catch(e){
      console.error("구매,판매,찜 갯수 가져오기 실패: ", e);
      throw e;
    }
  }
  
  