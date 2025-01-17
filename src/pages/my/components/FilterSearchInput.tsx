import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

interface FilterSearchInputProps {
  onFilterChange: (value: string) => void;
  placeholder?: string;
}

const SearchContainer = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.primary};
  background-color: white;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.7;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: color 0.2s ease;
`;

const FilterSearchInput: React.FC<FilterSearchInputProps> = ({
  placeholder = '브랜드나 모델명으로 필터링',
  onFilterChange
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onFilterChange(newValue); 
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <InputWrapper>
        <Input 
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <SearchButton type="button">
          <Search size={20} />
        </SearchButton>
      </InputWrapper>
    </SearchContainer>
  );
};

export default FilterSearchInput;