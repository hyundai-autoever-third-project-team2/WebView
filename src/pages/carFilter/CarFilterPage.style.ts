import { RefObject } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 100;
  height: 56px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

export const CloseButton = styled.button`
  background-color: #fff;
  font-size: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 56px;
  padding-bottom: 80px;
  min-height: calc(100vh - 56px);
`;

export const MenuList = styled.div`
  width: 96px;
  position: fixed;
  top: 56px; /* Header 높이 */
  bottom: 80px; /* Footer 높이 */
  background: #f8f9fa;
`;

export const MenuItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 16px;
  text-align: center;
  color: ${(props) => (props.$active ? '#000' : '#666')};
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  background-color: ${(props) => (props.$active ? 'white' : 'transparent')};
`;

export const ScrollContent = styled.div<{ ref: RefObject<HTMLDivElement> }>`
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 80px 112px;
`;

export const Section = styled.section`
  margin-bottom: 32px;
  &:last-child {
    min-height: calc(100vh - 136px);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const CarTypeSection = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const TypeButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  background-color: ${(props) => (props.$active ? props.theme.colors.primary : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#333')};
  transition: all 0.1s ease;
  white-space: nowrap;
`;

export const YearSelector = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const Select = styled.select`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RangeWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 10px 0;
`;

export const NumberInput = styled.input`
  width: 80px;
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const AllPriceText = styled.div`
  text-align: right;
  color: #f97316;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const ColorButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background-color: #fff;
`;

export const ColorCircle = styled.div<{ $color: string; $border?: boolean; $active?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: 0.5px solid ${(props) => (props.$border ? props.theme.colors.neutral200 : 'none')};
  border: 4px solid ${(props) => (props.$active ? props.theme.colors.primary : 'none')};
  transition: all 0.1s ease-in-out;
`;

export const Footer = styled.footer`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
`;

export const ResetButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;
