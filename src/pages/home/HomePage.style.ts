import styled from 'styled-components';
import { media } from 'styles/media';
import { LAYOUT } from 'styles/constants';
import { Bell } from 'lucide-react';

export const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${LAYOUT.APP_BAR_HEIGHT};
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #FFF;
  justify-content: space-between;
`;

export const Logo = styled.img``;

export const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral900};
`;

export const IconWrapper = styled.div``;

export const NotificationButton = styled(Bell)`
  color: ${({ theme }) => theme.colors.primary};
`

export const Container = styled.div`
  /* padding: 80px 16px 0; */

  ${media.mobile} {
    padding: 80px 20px 0;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $isActive }) => 
    $isActive ? '#FFF' : theme.colors.neutral500};
  background-color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primaryLight : 'transparent'};
  border: none;
  cursor: pointer;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.modalBackground};
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral900};
  margin-bottom: 8px;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.neutral600};
  line-height: 1.5;
  margin-bottom: 16px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const CardDate = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral400};
`;