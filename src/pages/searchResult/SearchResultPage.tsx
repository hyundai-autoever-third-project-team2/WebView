import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import styled from 'styled-components';
import SearchInput from 'components/common/SearchInput';
import Toolbar from 'components/common/Toolbar';
import CarListItem from 'components/common/CarListItem';
import Loading from 'components/common/Loading';
import { searchCars } from 'api/search/carSearchApi';
import { CarListItemData } from 'types/CarListItemData';
import * as S from './SearchResultPage.style';

const SearchInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

const ResultContainer = styled.div`
  flex: 1;
  padding: 0 16px;

  & > div {
    padding: 10px 0;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  text-align: center;
  color: #666;
  min-height: 200px;
`;

const RetryButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface SearchState {
  data: CarListItemData[];
  loading: boolean;
  error: string | null;
}

function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState<SearchState>({
    data: [],
    loading: false,
    error: null,
  });

  const keyword = searchParams.get('searchCar');

  useEffect(() => {
    async function fetchData() {
      if (!keyword) {
        setSearchState((prev) => ({ ...prev, data: [], error: null }));
        return;
      }

      setSearchState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await searchCars(keyword);
        setSearchState((prev) => ({
          ...prev,
          data: result,
          loading: false,
          error: null,
        }));
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setSearchState((prev) => ({
          ...prev,
          data: [],
          loading: false,
          error: '검색 결과를 불러오는데 실패했습니다. 다시 시도해주세요.',
        }));
      }
    }

    fetchData();
  }, [keyword]);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?searchCar=${encodeURIComponent(value.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const handleFilterClick = () => {
    navigate('/car-filter');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const renderContent = () => {
    if (searchState.loading) {
      return <Loading />;
    }

    if (searchState.error) {
      return (
        <MessageContainer>
          <p>{searchState.error}</p>
          <RetryButton onClick={() => window.location.reload()}>다시 시도</RetryButton>
        </MessageContainer>
      );
    }

    if (!keyword) {
      return (
        <MessageContainer>
          <p>검색어를 입력해주세요.</p>
        </MessageContainer>
      );
    }

    if (searchState.data.length === 0) {
      return (
        <MessageContainer>
          <p>검색 결과가 없습니다.</p>
          <p style={{ fontSize: '14px', marginTop: '8px', color: '#999' }}>다른 검색어로 시도해보세요.</p>
        </MessageContainer>
      );
    }

    return searchState.data.map((car) => <CarListItem key={car.carId} data={car} />);
  };

  return (
    <S.SearchResultPageContainer>
      <Toolbar title="검색 결과" showBackButton onBackClick={handleBackClick} />
      <SearchInputWrapper>
        <SearchInput initialValue={keyword || ''} onSearch={handleSearch} searchPageRouting={false} />
        <FilterButton onClick={handleFilterClick}>
          <SlidersHorizontal size={24} />
        </FilterButton>
      </SearchInputWrapper>
      <ResultContainer>{renderContent()}</ResultContainer>
    </S.SearchResultPageContainer>
  );
}

export default SearchResultPage;
