import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fixed?: boolean;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary',
  fixed = false,
  width = '100%', // 기본 너비
  height = '56px', // 기본 높이
  children,
  ...props 
}: ButtonProps) => {
  return (
    <StyledButton 
      variant={variant}
      fixed={fixed}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: string;
  fixed: boolean;
  width?: string;
  height: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  font-weight: ${props => props.theme.fontWeight.regular};
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;
  
  /* width 설정 */
  width: ${props => {
    if (props.width) return props.width;
    return 'auto';
  }};
  
  /* height 설정 */
  height: ${props => props.height};
  
  /* variant에 따른 스타일 */
  background-color: ${props => props.variant === 'primary' ? props.theme.colors.primary : '#ffffff'};
  color: ${props => props.variant === 'primary' ? '#ffffff' : '#000000'};
  
  /* fixed 설정 */
  position: ${props => props.fixed ? 'fixed' : 'static'};
  bottom: ${props => props.fixed ? '0' : 'auto'};
  left: ${props => props.fixed ? '0' : 'auto'};
  right: ${props => props.fixed ? '0' : 'auto'};
  
  /* fixed일 때 패딩 추가 */
  ${props => props.fixed && `
    margin: 16px;
    width: calc(100% - 32px);
  `}

  /* 비활성화 상태 */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: scale(0.97);
  }
`;

export default Button;