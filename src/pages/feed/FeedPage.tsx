import { useState, useEffect } from 'react';
import Stories from 'react-insta-stories';
import styled from 'styled-components';
import Feed from './Feed';

const StoryContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const FeedPage = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [key, setKey] = useState(0);

  const [usersStories, setUsersStories] = useState([
    {
      username: '현대자동차',
      stories: [
        {
          url: 'https://imgsc.chutcha.kr/files/car_resist/202412/29/2024122911065817354380182231_ori.jpg',
          content: (props: any) => <Feed />,
        },

        {
          url: 'https://imgsc.chutcha.kr/files/car_resist/202412/29/2024122911065817354380182210_ori.jpg',
          header: {
            heading: '현대자동차',
            subheading: '1시간 전',
            profileImage: 'https://picsum.photos/40',
          },
        },
      ],
    },
    {
      username: 'BMW코리아',
      stories: [
        {
          url: 'https://imgsc.chutcha.kr/files/car_resist/202412/29/2024122911065817354380182210_ori.jpg',
          header: {
            heading: 'BMW코리아',
            subheading: '30분 전',
            profileImage: 'https://picsum.photos/40',
          },
        },
        {
          url: 'https://imgsc.chutcha.kr/files/car_resist/202412/29/2024122911065817354380187565_ori.jpg',
          header: {
            heading: 'BMW코리아',
            subheading: '1시간 전',
            profileImage: 'https://picsum.photos/40',
          },
        },
      ],
    },
  ]);

  useEffect(() => {
    // username이 변경되면 해당 유저의 index로 변경
    const newIndex = usersStories.findIndex((user) => user.username === usersStories[currentUserIndex].username);
    if (newIndex !== -1 && newIndex !== currentUserIndex) {
      setCurrentUserIndex(newIndex);
    }
  }, [usersStories, currentUserIndex]);

  const onAllStoriesEnd = () => {
    if (currentUserIndex < usersStories.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
      setCurrentStoryIndex(0); // 스토리 인덱스 초기화
      setKey((prev) => prev + 1); // Stories 컴포넌트 리렌더링
    } else {
      console.log('스토리 재생 완료');
    }
  };

  const storiesProps = {
    width: '100%',
    height: '100vh',
    defaultInterval: 3000,
    storyStyles: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    currentIndex: currentStoryIndex,
  };

  return (
    <StoryContainer>
      <Stories
        key={key}
        stories={usersStories[currentUserIndex].stories}
        onAllStoriesEnd={onAllStoriesEnd}
        {...storiesProps}
        isPaused={false}
      />
    </StoryContainer>
  );
};

export default FeedPage;
