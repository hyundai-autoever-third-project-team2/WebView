import styled from "styled-components";
import { theme } from "styles/theme";

interface StatItemData {
  value: number;
  label: string;
}

interface StatMenuProps {
  items: StatItemData[];
  onItemClick?: (label: string) => void;
  activeLabel?: string | null;
}


const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: rgba(255, 221, 166, 0.20);
  border-radius: 12px;
  margin-top : 100px;
  color : ${theme.colors.primary}
`;


const StatItem = styled.div<{ $isActive?: boolean }>`
    text-align: center;
    flex: 1;
    cursor: pointer;
    padding: 10px 0;

    &:not(:first-child) {
        border-left: 2px solid ${theme.colors.primary};
    }
`;
const StatValue = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  margin-top: 4px;
`;

function StatMenu({ items, onItemClick, activeLabel }: StatMenuProps) {
    return (
        <StatsContainer>
            {items.map((item, idx) => (
                <StatItem 
                    key={idx} 
                    onClick={() => onItemClick?.(item.label)}
                    $isActive={item.label === activeLabel}
                >
                    <StatValue>{item.value}</StatValue>
                    <StatLabel>{item.label}</StatLabel>
                </StatItem>
            ))}
        </StatsContainer>
    );
}

export default StatMenu;