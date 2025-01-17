import { getUserInfo } from 'api/user/userApi';
import Loading from 'components/common/Loading';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInfo } from 'types/userInfo';

export const RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');
      
      if (!accessToken) {
        alert('로그인에 실패했습니다.');
        return;
      }

      try {
        localStorage.setItem('accessToken', `Bearer ${accessToken}`);
        
        // 유저 정보 요청 api 
        const userData = await getUserInfo();
        
        // 유저 정보 저장
        localStorage.setItem('email', userData!.email);
        localStorage.setItem('nickname', userData!.nickname);
        localStorage.setItem('profileImage', userData!.profileImage);
        localStorage.setItem('refreshToken', userData!.refreshToken);
        localStorage.setItem('userId', String(userData!.userId));
        
      } catch (error) {
        console.error("유저 데이터 받기 실패:", error);
        alert('유저 정보를 가져오는데 실패했습니다.');
      } 
      navigate('/');
    };

    fetchUserData();
  }, [navigate]);

  return <Loading />;
};
