import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface SearchInputProps {
  placeholder?: string;
  initialValue?: string;
  onSearch?: (value: string) => void;
  searchPageRouting?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = '브랜드나 모델명으로 검색해보세요.',
  initialValue = '',
  onSearch,
  searchPageRouting = true,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) return;

    if (searchPageRouting) {
      navigate(`/search?${trimmedValue}`);
    }

    onSearch?.(trimmedValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <InputWrapper>
        <Input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
        <SearchButton type="button" onClick={handleSearch} disabled={value.trim().length === 0}>
          <Search size={20} />
        </SearchButton>
      </InputWrapper>
    </SearchContainer>
  );
};

export default SearchInput;
