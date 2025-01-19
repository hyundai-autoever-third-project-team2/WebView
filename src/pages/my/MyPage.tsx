import styled from 'styled-components';
import Toolbar from '../../components/common/Toolbar';
import LogoutIc from '../../assets/icon_logout.svg';
import { theme } from 'styles/theme';
import ChatIcon from '../../assets/icon_mypage_chat.svg'
import GuideIcon from '../../assets/icon_mypage_guide.svg'
import NotificationIcon from '../../assets/icon_mypage_notification.svg'
import RightButton from '../../assets/icon_right_button.svg'


import testProfile from '../../assets/test_profile.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCountingList } from 'api/mypage/mypageApi';
import { useUser } from 'hooks/useUser';
import SettingModal from './components/SettingModal';
import { useQueryClient } from '@tanstack/react-query';

const Container = styled.div`
  background-color: #fff;
`;

const ProfileContainer = styled.div`
  background-color: ${theme.colors.primary};
  padding: 20px;
  padding-top: 100px;
  color: white;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const ProfileText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: rgba(255, 221, 166, 0.45);
  border-radius: 12px;
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
  cursor:pointer;
  padding: 6px 0;

      &:first-child {
    border-right : 2px solid ${theme.colors.primary};
    }
    &:last-child{
      border-left : 2px solid ${theme.colors.primary};
    }
  
`;

const StatValue = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  margin-top: 4px;
`;

const QuickMenuList = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px 30px;
  background-color: #FFF3E0;  
`;

const QuickMenuIcon = styled.img`
  width:1.6rem;
  height:1.6rem;
  margin-bottom : 10px;
`

const QuickMenuItem = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor:pointer;
  padding: 12px 0;
`;

const MenuList = styled.div`
  padding: 8px 20px;
`;

const MenuItem = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #EEEEEE;
  cursor:pointer;


  &:last-child {
    border-bottom: none;
  }
`;

const MenuIcon = styled.div`
  margin-right: 12px;
`;

const MenuText = styled.div`
  flex: 1;
`;

const MenuArrow = styled.img`
`;

const Logout = styled.div`
  display: flex;
  padding: 8px 20px;
  cursor:pointer;

`;

const LogoutIcon = styled.img`
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  color: #FF0000;
`;


interface MenuItemProps {
  icon: string;
  text: string;
  path: string;
}

const MENU_ITEMS: MenuItemProps[] = [
  { icon: '🚗', text: '내차사기', path: '/' },
  { icon: '💰', text: '내차팔기', path: '/register-car' },
  { icon: '📝', text: '피드보기', path: '/feed' }
];


function MyPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { data: user } = useUser();
  
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [statItems, setStatItems] = useState([
    {
      value: 0, label: '구매 내역', path: '/my/purchase'
    },
    {
      value: 0, label: '판매 내역', path: '/my/register'
    },
    {
      value: 0, label: '찜한 상품', path: '/wishlist'
    }
  ]);

  useEffect(() => {
    const loadCountingData = async () => {
      try {
        const data = await fetchCountingList();
        setStatItems([
          { value: data.saleCount, label: '구매 내역', path: '/my/purchase' },
          { value: data.purchaseCount, label: '판매 내역', path: '/my/register' },
          { value: data.heartCount, label: '찜한 상품', path: '/wishlist' }
        ]);
      } catch (error) {
        console.error('Failed to fetch counting data:', error);
      }
    };

    loadCountingData();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleMenuClick = (menuType: string) => () => {
    console.log("메뉴클릭 : " + menuType);
    navigate(menuType);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleUpdateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };


  const QUICKMENU_ITEMS: MenuItemProps[] = [
    { icon: ChatIcon, text: '채팅 상담', path: `/chat/${user?.userId}` },
    { icon: NotificationIcon, text: '공지사항', path: '/notice' },
    { icon: GuideIcon, text: '이용안내', path: '/guide' }
  ];

  return (
    <Container>
      <Toolbar 
        showBackButtonWhite
        title="마이페이지" 
        titleAlignment="left"
        rightButtons={['notificationWhite', 'settingWhite']}
        backgroundColor={theme.colors.primary}
        onBackClick={handleBackClick}
        color='white'
        onSettingClick={() => setIsSettingModalOpen(true)}
      />
      
      <ProfileContainer>
        <ProfileSection>
          <ProfileImage
            src={user?.profileImage || testProfile} 
            alt="profile" />
          <ProfileText>
            {user?.nickname || '사용자'} 님 
            <span>반갑습니다!</span>
          </ProfileText>
        </ProfileSection>

        <StatsContainer>
          {statItems.map((item, idx) => (
            <StatItem key={idx} onClick={handleMenuClick(item.path)}>
              <StatValue>{item.value}</StatValue>
              <StatLabel>{item.label}</StatLabel>
            </StatItem>
          ))}
        </StatsContainer>
      </ProfileContainer>

      <QuickMenuList>
        {QUICKMENU_ITEMS.map((item) => (
          <QuickMenuItem key={item.path} onClick={handleMenuClick(item.path)}>
            <QuickMenuIcon src={item.icon}/>
            {item.text}
          </QuickMenuItem>
        ))}
      </QuickMenuList>

      <MenuList>
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.path} onClick={handleMenuClick(item.path)}>
            <MenuIcon>{item.icon}</MenuIcon>
            <MenuText>{item.text}</MenuText>
            <MenuArrow src={RightButton}/>
          </MenuItem>
        ))}
      </MenuList>

      <Logout onClick={handleLogoutClick}>
        <LogoutIcon src={LogoutIc}></LogoutIcon>
        <LogoutButton>로그아웃 하기</LogoutButton>
      </Logout>

      {isSettingModalOpen && (
        <SettingModal 
          onClose={() => setIsSettingModalOpen(false)}
          user={user!}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </Container>
  );
}

export default MyPage;
