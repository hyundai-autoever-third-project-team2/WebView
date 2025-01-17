import { userInfo } from "types/userInfo";
import { client } from "utils/axiosInstance";

export const getUserInfo = async () => {
    try{
    const response = await client.get<userInfo>('/user/info')
    return response.data;
    } catch(e){
        console.error("유저정보 받기 실패: ",e)
    }
} 

