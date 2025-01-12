import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './BottomNavigationBar.style'
import { Home, CircleDollarSign, CarFront,Heart, User } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, to }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    onClick();
    navigate(to);
  };

  return (
    <S.NavButton isActive={isActive} onClick={handleClick}>
      {icon}
      <S.NavLabel>{label}</S.NavLabel>
    </S.NavButton>
  );
};

function BottomNavigationBar() {
  const [activeTab, setActiveTab] = useState<string>('main');
  const navigate = useNavigate();
  
  return (
    <S.NavContainer>
      <S.NavWrapper>
        <NavItem
          icon={<Home size={24} />}
          label="홈"
          isActive={activeTab === 'main'}
          onClick={() => setActiveTab('main')}
          to="/"
        />
        <NavItem
          icon={<CircleDollarSign size={24} />}
          label="내차팔기"
          isActive={activeTab === 'registercar'}
          onClick={() => setActiveTab('registercar')}
          to="/register-car"
        />
        <S.CenterButtonWrapper>
          <S.CenterButton
            isActive={activeTab === 'feed'}
            onClick={() => {
              setActiveTab('feed');
              navigate('/feed');
            }}>
            <CarFront size={30} color="white" />
          </S.CenterButton>
        </S.CenterButtonWrapper>
        <NavItem
          icon={<Heart size={24} />}
          label="찜"
          isActive={activeTab === 'wishlist'}
          onClick={() => setActiveTab('wishlist')}
          to="/wishlist"
        />
        <NavItem
          icon={<User size={24} />}
          label="마이"
          isActive={activeTab === 'my'}
          onClick={() => setActiveTab('my')}
          to="/my"
        />
      </S.NavWrapper>
    </S.NavContainer>
  );
}

export default BottomNavigationBar;