// Checkbox.tsx
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'small' | 'medium' | 'large';
}

const CheckboxContainer = styled.label<{ disabled?: boolean }>`
  align-items: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ 
  checked?: boolean; 
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}>`
  display: inline-block;
  width: ${props => {
    switch(props.size) {
      case 'small': return '16px';
      case 'large': return '24px';
      default: return '20px';
    }
  }};
  height: ${props => {
    switch(props.size) {
      case 'small': return '16px';
      case 'large': return '24px';
      default: return '20px';
    }
  }};
  background: ${props => props.checked ? theme.colors.primary : '#ffffff'};
  border: 2px solid ${props => props.checked ? theme.colors.primary : 'rgba(0,0,0,0.2)'};
  border-radius: 4px;
  transition: all 150ms;
  
  ${props => !props.disabled && `
    &:hover {
      border-color: ${theme.colors.primary};
    }
  `}

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(255, 157, 0, 0.2);
  }

  ${props => props.checked && `
    &::after {
      content: '';
      display: block;
      width: 50%;
      height: 25%;
      border: solid white;
      border-width: 0 0 2px 2px;
      transform: rotate(-45deg);
      position: relative;
      top: 25%;
      left: 20%;
    }
  `}
`;

const Label = styled.span<{ size?: 'small' | 'medium' | 'large' }>`
  margin-left: 8px;
  font-size: ${props => {
    switch(props.size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
`;

const Checkbox: React.FC<CheckboxProps> = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  label,
  size = 'medium'
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <CheckboxContainer disabled={disabled}>
      <HiddenCheckbox
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <StyledCheckbox 
        checked={checked} 
        disabled={disabled}
        size={size}
      />
      {label && <Label size={size}>{label}</Label>}
    </CheckboxContainer>
  );
};

export default Checkbox;