import styled from 'styled-components';

interface TagProps {
  label: string;
  onClick?: () => void;
}

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  padding: 7px 3px;
`;

const TagWrapper = styled.div`
  display: flex;
  color: #ffffff;
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

function Tag({ label }: TagProps) {
  return (
    <TagContainer>
      <TagWrapper>#{label}</TagWrapper>
    </TagContainer>
  );
}

export default Tag;
