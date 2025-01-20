import { SetStateAction, useEffect, useState } from "react";
import Toolbar from "components/common/Toolbar";
import StatMenu from "./components/StatMenu";
import { useNavigate } from "react-router-dom";
import DropDownButton from "./components/DropDownButton";
import styled from "styled-components";
import CarHistoryItem from "./components/CarHistoryItem";
import { fetchViewTransactionList } from "api/mypage/mypageApi"; 
import { CarViewTransactionData } from "types/ViewTransactionData";
import FilterSearchInput from "./components/FilterSearchInput";
import { useQuery } from "@tanstack/react-query";


interface StatusCounts {
  pending: number;
  completed: number;
  cancelled: number;
}


const Contents = styled.div``

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

const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchViewTransactionList,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,   
    retry: 2,                  
  });
};

function PurchasePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedProgress, setSelectedProgress] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    pending: 0,
    completed: 0,
    cancelled: 0
  });

  const { data: transactions = [], isLoading, error } = useTransactions();

  const getStatusCounts = () => {
    return [
      {
        value: statusCounts.pending,
        label: '거래중',
        onClick: () => setSelectedProgress('거래중'),
      },
      {
        value: statusCounts.completed,
        label: '거래 완료',
        onClick: () => setSelectedProgress('거래완료'),
      },
      {
        value: statusCounts.cancelled,
        label: '취소 / 반품',
        onClick: () => setSelectedProgress('취소'),
      },
    ];
  };

  useEffect(() => {
    const pending = transactions.filter((t) => t.progress === '거래중').length;
    const completed = transactions.filter((t) => t.progress === '거래완료').length;
    const cancelled = transactions.filter((t) => t.progress === '취소').length;

    setStatusCounts({
      pending,
      completed,
      cancelled
    });
  }, [transactions]);

  // Filtering logic
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !selectedYear || new Date(transaction.sales_date).getFullYear().toString() === selectedYear;
    const matchesProgress = !selectedProgress || transaction.progress === selectedProgress;

    return matchesSearch && matchesYear && matchesProgress;
  });

  // Helper functions remain the same...
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
          {error && <ErrorText>거래 내역이 존재하지 않습니다.</ErrorText>}

          {!isLoading &&
            !error &&
            filteredTransactions.map((transaction) => (
              <CarHistoryItem
                key={transaction.car_sales_id}
                car_sales_id={transaction.car_sales_id}
                car_id={transaction.car_id}
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