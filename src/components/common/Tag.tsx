import styled from 'styled-components';

interface TagProps {
  label: string;
  width?: number;
  onClick?: () => void;
}

const TagContainer = styled.div<{ $width?: number }>`
  display: flex;
  justify-content: center;
  width: ${({ $width }) => `${$width}px` || '40px'};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 7px 4px;
`;

const TagWrapper = styled.div`
  display: flex;
  color: #ffffff;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 0.25px;
`;

function Tag({ label, width }: TagProps) {
  return (
    <TagContainer $width={width}>
      <TagWrapper># {label}</TagWrapper>
    </TagContainer>
  );
}

export default Tag;
