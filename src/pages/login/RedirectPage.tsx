import Loading from 'components/common/Loading';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');

    if (accessToken) {
      localStorage.setItem('accessToken', `Bearer ${accessToken}`);
      navigate('/');
    } else {
      alert('로그인에 실패했습니다.');
    }
  }, [navigate]);

  return <Loading />;
};
