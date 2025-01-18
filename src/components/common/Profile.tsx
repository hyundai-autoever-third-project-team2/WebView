import styled from 'styled-components';
import { convertToHttps } from 'utils/convertToHttps';

interface ProfileProps extends React.HTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  src: string;
}

const ProfileContainer = styled.div<Omit<ProfileProps, 'src'>>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 100%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Profile({ width = '30px', height = '30px', src = 'https://via.placeholder.com/40' }: ProfileProps) {
  return (
    <ProfileContainer width={width} height={height}>
      <ProfileImage src={convertToHttps(src)} alt="프로필" />
    </ProfileContainer>
  );
}

export default Profile;
