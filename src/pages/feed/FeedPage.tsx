import { useState, useEffect } from 'react';
import Stories from 'react-insta-stories';
import styled from 'styled-components';
import Feed from './Feed';
import { UserStories } from 'types/Story';
import stories from 'mocks/storiesList';
import { getElapsedTime } from 'utils/getElapsedTime';

const StoryContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const mockApiResponse: UserStories[] = stories;

// Stories 컴포넌트용 데이터 변환
const transformToStoriesData = (apiData: UserStories[]) => {
  return apiData.map((userData) => ({
    username: userData.nickname,
    profile: userData.profile,
    stories: userData.stories.map((story) => ({
      content: () => (
        <Feed
          username={userData.nickname}
          profile={userData.profile}
          ellapsedTime={getElapsedTime(story.createdAt)}
          title={story.content}
          tags={story.tags}
          isLiked={story.isLiked}
          src={story.imageUrl}
        />
      ),
      duration: 3000,
    })),
  }));
};

// 컴포넌트에서 사용
function FeedPage() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [usersStories, setUsersStories] = useState([]);

  useEffect(() => {
    // API 호출을 시뮬레이션
    const fetchStories = async () => {
      // 실제로는 API 호출
      const response = mockApiResponse;
      const transformedData = transformToStoriesData(response);
      setUsersStories(transformedData);
    };

    fetchStories();
  }, []);

  const onAllStoriesEnd = () => {
    if (currentUserIndex < usersStories.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
      setCurrentStoryIndex(0);
      setKey((prev) => prev + 1);
    } else {
      console.log('모든 스토리 재생 완료');
    }
  };

  if (usersStories.length === 0) return null;

  return (
    <StoryContainer>
      <Stories
        key={key}
        stories={usersStories[currentUserIndex].stories}
        onAllStoriesEnd={onAllStoriesEnd}
        width="100%"
        height="100vh"
        defaultInterval={3000}
        isPaused={false}
        currentIndex={currentStoryIndex}
      />
    </StoryContainer>
  );
}

export default FeedPage;
