import styled from 'styled-components';
import { LAYOUT } from 'styles/constants';

export const SearchResultPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${LAYOUT.TOOLBAR_HEIGHT};
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  padding: 20px 20px 0 20px;
  gap: 10px;
  align-items: center;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
