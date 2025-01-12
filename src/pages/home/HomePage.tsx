import Button from 'components/common/Button';
import * as S from './HomePage.style';
import { useState } from 'react';
import { formatDate } from 'utils/formatDate';
import Logo from '../../assets/logo_small.png';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [activeTab, setActiveTab] = useState<'popular' | 'recent'>('popular');
  const navigate = useNavigate();

  const currentDate: Date = new Date();

  function handleOpenCamera() {
    if (Android) {
      Android.openCamera();
    } else {
      console.error('Android 객체가 존재하지 않습니다.');
    }
  }

  function handleNotificationButtonClick() {
    navigate('/notification');
  }

  return (
    <>
      <S.Header>
        <S.Logo src={Logo} alt="타볼카 로고" />
        <S.IconWrapper>
          <S.NotificationButton onClick={handleNotificationButtonClick}/>
        </S.IconWrapper>
      </S.Header>

      <S.Container>
        <S.TabContainer>
          <S.Tab $isActive={activeTab === 'popular'} onClick={() => setActiveTab('popular')}>
            인기
          </S.Tab>
          <S.Tab $isActive={activeTab === 'recent'} onClick={() => setActiveTab('recent')}>
            최신
          </S.Tab>
        </S.TabContainer>

        <S.ContentSection>
          <S.Card>
            <S.CardContent>
              <S.CardTitle>제목</S.CardTitle>
              <S.CardDescription>내용</S.CardDescription>
              <S.CardFooter>
                <S.Badge>New</S.Badge>
                <S.CardDate>{formatDate(currentDate)}</S.CardDate>
              </S.CardFooter>
            </S.CardContent>
          </S.Card>
          <S.Card>
            <S.CardContent>
              <S.CardTitle>제목</S.CardTitle>
              <S.CardDescription>내용</S.CardDescription>
              <S.CardFooter>
                <S.Badge>New</S.Badge>
                <S.CardDate>{formatDate(currentDate)}</S.CardDate>
              </S.CardFooter>
            </S.CardContent>
          </S.Card>
          <S.Card>
            <S.CardContent>
              <S.CardTitle>제목</S.CardTitle>
              <S.CardDescription>내용</S.CardDescription>
              <S.CardFooter>
                <S.Badge>New</S.Badge>
                <S.CardDate>{formatDate(currentDate)}</S.CardDate>
              </S.CardFooter>
            </S.CardContent>
          </S.Card>
          <S.Card>
            <S.CardContent>
              <S.CardTitle>제목</S.CardTitle>
              <S.CardDescription>내용</S.CardDescription>
              <S.CardFooter>
                <S.Badge>New</S.Badge>
                <S.CardDate>{formatDate(currentDate)}</S.CardDate>
              </S.CardFooter>
            </S.CardContent>
          </S.Card>
          <S.Card>
            <S.CardContent>
              <S.CardTitle>제목</S.CardTitle>
              <S.CardDescription>내용</S.CardDescription>
              <S.CardFooter>
                <S.Badge>New</S.Badge>
                <S.CardDate>{formatDate(currentDate)}</S.CardDate>
              </S.CardFooter>
            </S.CardContent>
          </S.Card>
          <Button onClick={handleOpenCamera}>버튼</Button>
        </S.ContentSection>

      </S.Container>
    </>
  );
}

export default HomePage;
