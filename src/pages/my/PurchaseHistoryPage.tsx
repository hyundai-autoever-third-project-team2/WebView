import { SetStateAction, useEffect, useState } from 'react';
import Toolbar from 'components/common/Toolbar';
import StatMenu from './components/StatMenu';
import { useNavigate } from 'react-router-dom';
import DropDownButton from './components/DropDownButton';
import styled from 'styled-components';
import CarHistoryItem from './components/CarHistoryItem';
import { fetchViewTransactionList } from 'api/mypage/mypageApi';
import { CarViewTransactionData } from 'types/ViewTransactionData';
import FilterSearchInput from './components/FilterSearchInput';

const Contents = styled.div``;

const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  gap: 8px;
  font-size: 0.9rem;
`;

const CarHistoryList = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: ${({ theme }) => theme.colors.gray};
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 20px;
  color: ${({ theme }) => theme.colors.error};
`;

function PurchasePage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<CarViewTransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedProgress, setSelectedProgress] = useState<string | null>(null);

  // 거래 상태별 카운트 계산
  const getStatusCounts = () => {
    const pending = transactions.filter((t) => t.progress === '거래중').length;
    const completed = transactions.filter((t) => t.progress === '거래완료').length;
    const cancelled = transactions.filter((t) => t.progress === '취소').length;

    return [
      {
        value: pending,
        label: '거래중',
        onClick: () => setSelectedProgress('거래중'),
      },
      {
        value: completed,
        label: '거래 완료',
        onClick: () => setSelectedProgress('거래완료'),
      },
      {
        value: cancelled,
        label: '취소 / 반품',
        onClick: () => setSelectedProgress('취소'),
      },
    ];
  };

  // 데이터 로딩
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchViewTransactionList();
        log(data);
        setTransactions(data);
      } catch (e) {
        setError('거래 내역이 존재하지 않습니다.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // 필터링
  const filteredTransactions = transactions.filter((transaction) => {
    // 검색어 필터
    const matchesSearch =
      transaction.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.brand.toLowerCase().includes(searchTerm.toLowerCase());
    // 연도 필터
    const matchesYear = !selectedYear || new Date(transaction.sales_date).getFullYear().toString() === selectedYear;

    // Progress 필터
    const matchesProgress = !selectedProgress || transaction.progress === selectedProgress;

    return matchesSearch && matchesYear && matchesProgress;
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatDate = (date: Date) => {
    return new Date(date)
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '. ')
      .replace(/ $/, '');
  };

  const formatPrice = (price: number) => {
    return `${(price / 10000).toFixed(0)}만원`;
  };

  const formatMonthlyPayment = (price: number) => {
    return `${(price / 10000 / 36).toFixed(0)}만원`;
  };

  const handleYearSelect = (year: string | null) => {
    setSelectedYear(year);
  };

  // StatMenu 클릭 핸들러
  const handleStatClick = (label: string) => {
    let status;
    switch (label) {
      case '거래중':
        status = '거래중';
        break;
      case '거래 완료':
        status = '거래완료';
        break;
      case '취소 / 반품':
        status = '취소';
        break;
      default:
        status = null;
    }
    // 같은 상태를 다시 클릭하면 필터 해제
    setSelectedProgress((prevStatus) => (prevStatus === status ? null : status));
  };

  return (
    <>
      <Toolbar showBackButton title="구매 내역" onBackClick={handleBackClick} />
      <StatMenu items={getStatusCounts()} onItemClick={handleStatClick} />

      <Contents>
        <SearchContainer>
          <FilterSearchInput onFilterChange={setSearchTerm} placeholder="브랜드나 모델명으로 검색하세요" />
          <DropDownButton onYearSelect={handleYearSelect} />
        </SearchContainer>

        <CarHistoryList>
          {isLoading && <LoadingText>거래 내역을 불러오는 중입니다...</LoadingText>}
          {error && <ErrorText>{error}</ErrorText>}

          {!isLoading &&
            !error &&
            filteredTransactions.map((transaction) => (
              <CarHistoryItem
                key={transaction.car_sales_id}
                car_sales_id={transaction.car_sales_id}
                date={formatDate(transaction.sales_date)}
                status={transaction.progress}
                title={`${transaction.brand} ${transaction.model_name}`}
                model={`주문번호 A-2025011${transaction.car_sales_id}`}
                price={formatPrice(transaction.price)}
                monthlyPayment={'/ 월 ' + formatMonthlyPayment(transaction.price)}
                imageUrl={transaction.imageUrl}
                isPurchase
              />
            ))}

          {!isLoading && !error && filteredTransactions.length === 0 && (
            <LoadingText>검색 결과가 없습니다.</LoadingText>
          )}
        </CarHistoryList>
      </Contents>
    </>
  );
}

export default PurchasePage;
