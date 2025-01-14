import Profile from 'components/common/Profile';
import { ArrowLeft, EllipsisVertical } from 'lucide-react';
import styled from 'styled-components';

const FeedContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
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
`;

const FeedHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledThreeDots = styled(EllipsisVertical)`
  position: fixed;
  top: 0;
  left: 1;
  bottom: 1;
  right: 0;
  margin-top: 25px;
  margin-right: 10px;
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
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const ElapsedTime = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.neutral300};
`;

const BottomSection = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%);
`;

function Feed() {
  return (
    <FeedContainer>
      <FeedHeader>
        <FeedHeaderLeft>
          <ArrowLeft color="white" />
          <Profile src="https://as1.ftcdn.net/v2/jpg/00/56/01/00/500_F_56010077_UA98ADMw95rEB2hCuAlFOJkjdirrAAPV.jpg" />
          <FeedHeaderText>
            <Nickname>전우정</Nickname>
            <ElapsedTime>1시간 전</ElapsedTime>
          </FeedHeaderText>
        </FeedHeaderLeft>
      </FeedHeader>
      <StyledThreeDots color="white" />
      <BottomSection />
    </FeedContainer>
  );
}

export default Feed;
