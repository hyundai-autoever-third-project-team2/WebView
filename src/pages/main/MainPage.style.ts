import styled from 'styled-components';
import { media } from 'styles/media';
import { LAYOUT } from 'styles/constants';

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${LAYOUT.HEADER_HEIGHT};
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
`;

export const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral900};
`;

export const Container = styled.div`
  min-width: ${LAYOUT.MIN_WIDTH};
  margin: 0 auto;
  padding: 80px 16px 0;

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
    $isActive ? theme.colors.primary : theme.colors.neutral500};
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

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
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

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.modalBackground};
`;

export const PlusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  width: 40px;
  height: 40px;
`;