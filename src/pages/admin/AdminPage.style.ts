import styled from 'styled-components';

export const Container = styled.div`
 padding: 24px;
`;

export const PageHeader = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
 font-size: ${({ theme }) => theme.fontSize.h2};
 font-weight: ${({ theme }) => theme.fontWeight.bold};
 color: ${({ theme }) => theme.colors.neutral900};
 margin-bottom: 24px;
`;

export const StatsGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 24px;
 margin-bottom: 32px;
`;

export const StatCard = styled.div`
 background: white;
 padding: 24px;
 border-radius: ${({ theme }) => theme.borderRadius.md};
 box-shadow: 0 2px 4px ${({ theme }) => theme.colors.modalBackground};
`;

export const StatTitle = styled.h3`
 font-size: ${({ theme }) => theme.fontSize.md};
 color: ${({ theme }) => theme.colors.neutral600};
 margin-bottom: 8px;
`;

export const StatValue = styled.div`
 font-size: ${({ theme }) => theme.fontSize.h2};
 font-weight: ${({ theme }) => theme.fontWeight.bold};
 color: ${({ theme }) => theme.colors.primary};
 margin-bottom: 8px;
`;

export const StatChange = styled.div<{ isPositive?: boolean }>`
 font-size: ${({ theme }) => theme.fontSize.sm};
 color: ${({ theme, isPositive }) => 
   isPositive ? theme.colors.success : theme.colors.error};
`;

export const Section = styled.section`
 margin-top: 32px;
`;

export const SectionTitle = styled.h2`
 font-size: ${({ theme }) => theme.fontSize.lg};
 font-weight: ${({ theme }) => theme.fontWeight.bold};
 color: ${({ theme }) => theme.colors.neutral900};
 margin-bottom: 16px;
`;

export const SearchContainer = styled.div`
 display: flex;
 gap: 8px;
`;

export const SearchInput = styled.input`
 padding: 8px 16px;
 border: 1px solid ${({ theme }) => theme.colors.neutral300};
 border-radius: ${({ theme }) => theme.borderRadius.sm};
 font-size: ${({ theme }) => theme.fontSize.md};

 &:focus {
   outline: none;
   border-color: ${({ theme }) => theme.colors.primary};
 }
`;

export const SearchButton = styled.button`
 padding: 8px 16px;
 background: ${({ theme }) => theme.colors.primary};
 color: white;
 border: none;
 border-radius: ${({ theme }) => theme.borderRadius.sm};
 cursor: pointer;

 &:hover {
   opacity: 0.9;
 }
`;

export const Table = styled.table`
 width: 100%;
 border-collapse: collapse;
 background: white;
 border-radius: ${({ theme }) => theme.borderRadius.md};
 overflow: hidden;
`;

export const Th = styled.th`
 padding: 16px;
 text-align: left;
 background: ${({ theme }) => theme.colors.neutral50};
 border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
`;

export const Td = styled.td`
 padding: 16px;
 border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
`;

export const StatusBadge = styled.span<{ status: 'active' | 'inactive' }>`
 padding: 4px 8px;
 border-radius: ${({ theme }) => theme.borderRadius.xs};
 font-size: ${({ theme }) => theme.fontSize.sm};
 background: ${({ status, theme }) => 
   status === 'active' ? theme.colors.success + '20' : theme.colors.neutral200};
 color: ${({ status, theme }) => 
   status === 'active' ? theme.colors.success : theme.colors.neutral600};
`;

export const ActionButton = styled.button<{ variant?: 'danger' }>`
 padding: 6px 12px;
 margin-right: 8px;
 border-radius: ${({ theme }) => theme.borderRadius.xs};
 border: none;
 background: ${({ variant, theme }) => 
   variant === 'danger' ? theme.colors.error : theme.colors.primary};
 color: white;
 cursor: pointer;

 &:hover {
   opacity: 0.9;
 }
`;

export const Pagination = styled.div`
 display: flex;
 justify-content: center;
 gap: 8px;
 margin-top: 24px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
 padding: 8px 12px;
 border: 1px solid ${({ theme, $active }) => 
   $active ? theme.colors.primary : theme.colors.neutral300};
 background: ${({ theme, $active }) => 
   $active ? theme.colors.primary : 'white'};
 color: ${({ theme, $active }) => 
   $active ? 'white' : theme.colors.neutral600};
 border-radius: ${({ theme }) => theme.borderRadius.sm};
 cursor: pointer;

 &:hover {
   border-color: ${({ theme }) => theme.colors.primary};
   color: ${({ theme, $active }) => 
     $active ? 'white' : theme.colors.primary};
 }
`;