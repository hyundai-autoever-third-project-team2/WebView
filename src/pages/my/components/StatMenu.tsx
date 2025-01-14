import styled from "styled-components";
import { theme } from "styles/theme";

interface StatItemData {
  value: number;
  label: string;
}

interface StatMenuProps {
  items: StatItemData[];
  onItemClick?: (path: string) => void;
}

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: rgba(255, 221, 166, 0.20);
  border-radius: 12px;
  margin-top : 100px;
  color : ${theme.colors.primary}
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
  cursor: pointer;
  padding: 10px 0;

  &:not(:first-child) {
    border-left: 2px solid ${theme.colors.primary};
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  margin-top: 4px;
`;

function StatMenu({ items, onItemClick }: StatMenuProps) {
  const handleItemClick = (label: string) => () => {
    log(label + "버튼 클릭");
  };

  if (items.length !== 3) {
    console.warn('StatMenu expects exactly 3 items');
    return null;
  }

  return (
    <StatsContainer>
      {items.map((item, idx) => (
        <StatItem key={idx} onClick={handleItemClick(item.label)}>
          <StatValue>{item.value}</StatValue>
          <StatLabel>{item.label}</StatLabel>
        </StatItem>
      ))}
    </StatsContainer>
  );
}

export default StatMenu;