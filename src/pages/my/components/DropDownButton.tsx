import { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import { theme } from 'styles/theme';

const DropdownContainer = styled.div`
  position: relative;
  width: 40%;
  margin: auto 0;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme.colors.primary};
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  height: 45px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const DropdownText = styled.p<{ $hasValue: boolean }>`
  color: ${props => props.$hasValue ? '#fff' : '#fff'};
  width: 90%
`;

const RotatingIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  width: 20px;
  height: 20px;
  color: #ffffff;
  transition: transform 0.2s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  flex-shrink: 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 3px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
`;

const OptionsList = styled.ul`
  max-height: 240px;
  overflow-y: auto;
  padding: 0px 0;
  margin: 0;
  list-style: none;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const Option = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  color: #1a202c;
  transition: all 0.2s ease;

  &:hover {
    background: #eff6ff;
    color: #2563eb;
  }
`;

interface DropDownButtonProps {
  options?: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
  onYearSelect?: (year: string | null) => void;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
  options = ['2022년', '2023년', '2024년', '2025년'],
  placeholder = '연도별',
  onChange = (value: string) => console.log(value),
  onYearSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    onChange(option);
    
    // 선택된 연도를 추출하여 상위 컴포넌트로 전달
    if (onYearSelect) {
      if (option === placeholder) {
        onYearSelect(null); // 초기화 시
      } else {
        const year = option.replace('년', '');
        onYearSelect(year);
      }
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <DropdownText $hasValue={!!selectedValue}>
          {selectedValue || placeholder}
        </DropdownText>
        <RotatingIcon $isOpen={isOpen} />
      </DropdownButton>

      {isOpen && (
        <DropdownMenu>
          <OptionsList>
            <Option
              key="all"
              onClick={() => handleSelect(placeholder)}
            >
              {placeholder}
            </Option>
            {options.map((option, index) => (
              <Option
                key={index}
                onClick={() => handleSelect(option)}
              >
                {option}
              </Option>
            ))}
          </OptionsList>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default DropDownButton;