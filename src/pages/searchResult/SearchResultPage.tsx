import SearchInput from 'components/common/SearchInput';
import * as S from './SearchResultPage.style';
import Toolbar from 'components/common/Toolbar';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import mockCarListItem from 'mocks/carListItem';
import CarListItem from 'components/common/CarListItem';

function fetchSearchResults({ brand, model }) {
  // 검색 결과를 가져오는 비동기 함수
}

const mockApiResponse = mockCarListItem;

function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');

  useEffect(() => {
    if (brand || model) {
      fetchSearchResults({ brand, model });
    }
  }, [brand, model]);

  function handleFilterClick() {
    navigate('/car-filter');
  }

  return (
    <>
      <Toolbar title="검색 결과" showBackButton onBackClick={() => navigate(-1)} />
      <S.SearchResultPageContainer>
        <S.SearchInputWrapper>
          <SearchInput />
          <SlidersHorizontal onClick={handleFilterClick} />
        </S.SearchInputWrapper>
        {mockApiResponse.map((car) => (
          <CarListItem key={car.carId} data={car} />
        ))}
      </S.SearchResultPageContainer>
    </>
  );
}

export default SearchResultPage;
