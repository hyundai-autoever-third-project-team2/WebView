import { useState, useEffect } from 'react';
import Stories from 'react-insta-stories';
import styled from 'styled-components';
import Feed from './Feed';
import { UserStories } from 'types/Feed';
import { getElapsedTime } from 'utils/getElapsedTime';
import { getFeedList } from 'api/feed/feedApi';
import Loading from 'components/common/Loading';

const StoryContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

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

function FeedPage() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [usersStories, setUsersStories] = useState<
    {
      username: string;
      profile: string;
      stories: { content: () => JSX.Element; duration: number }[];
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const response = await getFeedList();
        console.log('피드 목록:', response);
        const transformedData = response ? transformToStoriesData(response) : [];
        setUsersStories(transformedData);
      } catch (error) {
        console.error('피드를 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
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

  if (isLoading) return <Loading />;
  if (usersStories.length === 0) return <div>등록된 피드가 없어요.</div>;

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
