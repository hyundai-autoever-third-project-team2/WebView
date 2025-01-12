export const LoginPage = () => {
  const handleKakaoLoginClick = () => {
    if (Kakao) {
      Kakao.kakaoLogin();
    } else {
      alert('로그인에 실패했습니다.');
    }
  };

  return <div onClick={handleKakaoLoginClick}>LoginPage</div>;
};
