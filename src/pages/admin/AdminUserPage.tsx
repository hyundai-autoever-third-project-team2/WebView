import * as S from './AdminPage.style';

function AdminUserPage() {
    return (
      <S.Container>
        <S.PageHeader>
          <S.PageTitle>사용자 관리</S.PageTitle>
          <S.SearchContainer>
            <S.SearchInput placeholder="사용자 검색..." />
            <S.SearchButton>검색</S.SearchButton>
          </S.SearchContainer>
        </S.PageHeader>
  
        <S.Table>
          <thead>
            <tr>
              <S.Th>ID</S.Th>
              <S.Th>이름</S.Th>
              <S.Th>이메일</S.Th>
              <S.Th>가입일</S.Th>
              <S.Th>상태</S.Th>
              <S.Th>관리</S.Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <S.Td>1</S.Td>
              <S.Td>홍길동</S.Td>
              <S.Td>hong@example.com</S.Td>
              <S.Td>2024-01-08</S.Td>
              <S.Td><S.StatusBadge status="active">활성</S.StatusBadge></S.Td>
              <S.Td>
                <S.ActionButton>수정</S.ActionButton>
                <S.ActionButton variant="danger">삭제</S.ActionButton>
              </S.Td>
            </tr>
          </tbody>
        </S.Table>
  
        <S.Pagination>
          <S.PageButton>&lt;</S.PageButton>
          <S.PageButton $active>1</S.PageButton>
          <S.PageButton>2</S.PageButton>
          <S.PageButton>3</S.PageButton>
          <S.PageButton>&gt;</S.PageButton>
        </S.Pagination>
      </S.Container>
    );
  }
 
 export default AdminUserPage;