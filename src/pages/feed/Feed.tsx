import Profile from 'components/common/Profile';
import { ArrowLeft, Camera, EllipsisVertical, Flag, Heart } from 'lucide-react';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FeedContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: transparent;
`;

const FeedHeader = styled.div`
  display: flex;
  position: fixed;
  margin-top: 25px;
  top: 0;
  left: 0;
  right: 1;
  bottom: 1;
  padding: 0 10px;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
`;

const FeedHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ThreeDotsButton = styled.button`
  position: fixed;
  top: 0;
  left: 1;
  bottom: 1;
  right: 0;
  margin-top: 30px;
  margin-right: 10px;
  z-index: 9999;
  background-color: transparent;
  transition: 0.3s;
`;

const DropdownMenu = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  top: 0;
  left: 1;
  right: 0;
  bottom: 1;
  background-color: ${({ theme }) => theme.colors.neutral50};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: 55px;
  margin-right: 10px;
  transition: 0.3s ease-in-out;
  z-index: 9999;
`;

const DropdownMenuItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.sm};
  white-space: nowrap;
  text-align: center;
  gap: 5px;
`;

const FeedHeaderText = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.neutral50};
  font-size: ${({ theme }) => theme.fontSize.xs};
  gap: 8px;
  align-items: center;
`;

const Nickname = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const ElapsedTime = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.neutral300};
`;

const BottomSection = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 200px;
  top: 1;
  left: 1;
  bottom: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%);
  z-index: 9999;
`;

const BottomSectionCotent = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  top: 1;
  flex-direction: column;
  gap: 15px;
  padding: 30px 20px;
  color: ${({ theme }) => theme.colors.neutral50};
`;

const FeedTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const FeedTagWrapper = styled.div`
  display: flex;
`;

const FeedTag = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const BottomButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 30px;
`;

const BottomButton = styled.button`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.neutral50};
  background: transparent;
  gap: 10px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  z-index: 9999;
`;

const StyledHeart = styled(Heart)<{ isLiked?: boolean }>`
  fill: ${({ isLiked }) => (isLiked ? 'red' : 'none')};
  color: ${({ isLiked }) => (isLiked ? 'red' : 'white')};
  size: 30px;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.9);
  }
`;

const FeedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export interface FeedProps {
  username: string;
  profile: string;
  ellapsedTime: string;
  title: string;
  tags: string[];
  isLiked?: boolean;
  src: string;
}

function Feed({ username, profile, ellapsedTime, title, tags, src, isLiked }: FeedProps) {
  const [isMenuOpen, toggleMenu] = useReducer((v) => !v, false);
  const [isLikedState, toggleLike] = useReducer((v) => !v, !!isLiked);
  const navigate = useNavigate();

  const handleArrowLeftClick = () => {
    navigate('/');
  };

  const handleAddFeed = () => {
    navigate('/feed/add');
  };

  const handleReportFeed = () => {
    window.confirm('신고하시겠습니까?');
  };

  const handleLikeButton = () => {
    toggleLike();
  };

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedHeaderLeft>
          <ArrowLeft color="white" onClick={handleArrowLeftClick} />
          <Profile src={profile} />
          <FeedHeaderText>
            <Nickname>{username}</Nickname>
            <ElapsedTime>{ellapsedTime}</ElapsedTime>
          </FeedHeaderText>
        </FeedHeaderLeft>
      </FeedHeader>
      <ThreeDotsButton onClick={toggleMenu}>
        <EllipsisVertical color="white" />
      </ThreeDotsButton>
      {isMenuOpen && (
        <DropdownMenu>
          <DropdownMenuItem onClick={handleAddFeed}>
            <Camera size={20} />내 차도 자랑하기
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleReportFeed} style={{ color: 'red' }}>
            <Flag size={20} />
            부적절한 피드 신고
          </DropdownMenuItem>
        </DropdownMenu>
      )}
      <FeedImage src={src} />
      <BottomSection>
        <BottomSectionCotent>
          <FeedTitle>{title}</FeedTitle>
          <FeedTagWrapper>
            {tags.map((tag) => (
              <FeedTag key={tag}>#{tag}&nbsp;</FeedTag>
            ))}
          </FeedTagWrapper>
        </BottomSectionCotent>
        <BottomButtonSection>
          <BottomButton onClick={handleLikeButton}>
            <StyledHeart isLiked={isLikedState} />
            좋아요
          </BottomButton>
          <BottomButton></BottomButton>
        </BottomButtonSection>
      </BottomSection>
    </FeedContainer>
  );
}

export default Feed;
