import styled from 'styled-components';
import { LAYOUT } from 'styles/constants';

export const AddFeedPageContainer = styled.div`
  display: flex;
  margin-top: ${LAYOUT.TOOLBAR_HEIGHT};
  padding: 20px 20px 0 20px;
  flex-direction: column;
`;

export const AddImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral800};

  svg {
    margin-left: 0px;
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AddContentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 10px;
`;

export const AddTagSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 10px;
`;

export const TagInputContainer = styled.div`
  position: relative;
`;

export const TagInput = styled.input`
  width: auto;
  padding: 8px 35px 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: solid ${({ theme }) => theme.colors.primary};
  border-width: 1px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-width: 2px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral400};
  }
`;

export const AddTagButton = styled.button`
  position: absolute;
  right: 58%;
  top: 15px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  pointer-events: auto;
  z-index: 1;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 10px;
  border-radius: 16px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral800};

  button {
    background: none;
    border: none;
    padding: 0;
    margin-left: 6px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.neutral500};
    display: flex;
    align-items: center;

    &:hover {
      color: ${({ theme }) => theme.colors.neutral700};
    }
  }
`;
