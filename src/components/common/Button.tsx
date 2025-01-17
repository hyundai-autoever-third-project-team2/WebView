import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'primary' | 'secondary';
  $fixed?: boolean;
  $width?: string;
  $height?: string;
  children: React.ReactNode;
}

export const Button = ({
  $variant = 'primary',
  $fixed = false,
  $width = '100%',
  $height = '56px',
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $variant={$variant} $fixed={$fixed} $width={$width} $height={$height} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $variant: string;
  $fixed: boolean;
  $width?: string;
  $height: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  transition:
    background-color 0.3s,
    transform 0.3s;
  cursor: pointer;

  width: ${(props) => {
    if (props.$width) return props.$width;
    return 'auto';
  }};

  height: ${(props) => props.$height};

  background-color: ${(props) => (props.$variant === 'primary' ? props.theme.colors.primary : '#ffffff')};
  color: ${(props) => (props.$variant === 'primary' ? '#ffffff' : '#000000')};

  position: ${(props) => (props.$fixed ? 'fixed' : 'static')};
  bottom: ${(props) => (props.$fixed ? '0' : 'auto')};
  left: ${(props) => (props.$fixed ? '0' : 'auto')};
  right: ${(props) => (props.$fixed ? '0' : 'auto')};

  ${(props) =>
    props.$fixed &&
    `
    margin: 16px;
    width: calc(100% - 32px);
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primaryDark};
    transform: scale(0.97);
  }

  z-index: 1000;
`;

export default Button;
