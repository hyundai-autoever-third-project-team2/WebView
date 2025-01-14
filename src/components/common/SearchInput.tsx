import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
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

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = '브랜드나 모델명으로 검색해보세요.',
  initialValue = '',
}) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim().length === 0) {
      return;
    }

    onSearch?.(value);
    console.log('Search value:', value);
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <InputWrapper>
        <Input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
        <SearchButton type="submit" disabled={value.trim().length === 0}>
          <Search size={20} />
        </SearchButton>
      </InputWrapper>
    </SearchContainer>
  );
};

export default SearchInput;
