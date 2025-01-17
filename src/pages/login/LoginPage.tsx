import * as S from './LoginPage.style';
import KakaoLoginButton from 'assets/kakao_login.png';
import Logo from 'assets/logo_large.png';

export const LoginPage = () => {
  const handleKakaoLoginClick = () => {
    window.location.href = `${import.meta.env.VITE_KAKAO_LOGIN_URL}`;
  };

  return (
    <S.LoginPageWrapper>
      <S.LogoWrapper>
        <S.Logo src={Logo} alt="logo" />
      </S.LogoWrapper>
      <S.LoginButtonWrapper>
        <img src={KakaoLoginButton} alt="kakao-login" onClick={handleKakaoLoginClick} />
      </S.LoginButtonWrapper>
    </S.LoginPageWrapper>
  );
};
