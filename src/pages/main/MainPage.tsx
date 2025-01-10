import * as S from './MainPage.style';
import { useState } from 'react';
import { formatDate } from 'utils/formatDate';

function MainPage() {
  const [activeTab, setActiveTab] = useState<'popular' | 'recent'>('popular');

  log('MainPage rendered');

  const currentDate: Date = new Date();

  function handleOpenCamera() {
    if (Android) {
      Android.openCamera();
    } else {
      console.error('Android 객체가 존재하지 않습니다.');
    }
  }

  return (
    <>
      <S.Header>
        <S.HeaderTitle>타볼카</S.HeaderTitle>
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
        </S.ContentSection>

        <S.FloatingButton onClick={handleOpenCamera}>
          <S.PlusIcon>+</S.PlusIcon>
        </S.FloatingButton>
      </S.Container>
    </>
  );
}

export default MainPage;
