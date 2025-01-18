import  Toolbar  from '../../components/common/Toolbar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface Notice {
  title: string;
  content: string;
  createdAt: string;
}

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  padding-top: 80px;
`;

const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoticeItem = styled.div`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  line-height: 1.2rem;
  
  &:hover {
    background-color: #f8f8f8;
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  padding: 2px;
  color: #333;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 0 8px 0;
`;

const Date = styled.span`
  font-size: 14px;
  color: #999;
`;


const NoticePage: React.FC = () => {
  const dummyNotices: Notice[] = [
    {
      title: "서비스 업데이트 안내",
      content: "안녕하세요. 더 나은 서비스 제공을 위해 다음 주 화요일 오전 2시부터 4시까지 시스템 점검이 진행될 예정입니다. 이용에 참고 부탁드립니다.",
      createdAt: '2024-01-15'
    },
    {
      title: "개인정보 처리방침 개정 안내",
      content: "개인정보 처리방침이 2024년 2월 1일자로 일부 개정될 예정입니다. 주요 변경사항은 '제3자 제공 항목' 및 '보관 기간'과 관련된 내용이며, 자세한 내용은 공지사항 상세페이지에서 확인하실 수 있습니다.",
      createdAt: '2024-01-10'
    },
    {
      title: "앱 신규 기능 안내",
      content: "사용자분들의 요청이 많았던 '다크모드' 기능이 추가되었습니다. 앱 설정 메뉴에서 테마를 변경하실 수 있으며, 기타 UI 개선사항도 함께 적용되었습니다.",
      createdAt: '2024-01-05'
    },
  ];
  const navigate = useNavigate()
  const [notices, setNotices] = useState<Notice[]>(dummyNotices);

//   useEffect(() => {
//     // fetchNotices();
//   }, []);

//   const fetchNotices = async () => {
//     try {
//       const response = await fetch();
//       const data = await response.json();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <>
    <Toolbar title='공지사항' showBackButtonWhite backgroundColor={theme.colors.primary} color='white' onBackClick={handleBackClick}/>
    <Container>
        <NoticeList>
            {notices.map((notice, index) => (
                <NoticeItem key={index}>
                <Title>{notice.title}</Title>
                <Content>{notice.content}</Content>
                <Date>{notice.createdAt}</Date>
            </NoticeItem>
            ))}
        </NoticeList>
    </Container>
    </>
  );
};

export default NoticePage;