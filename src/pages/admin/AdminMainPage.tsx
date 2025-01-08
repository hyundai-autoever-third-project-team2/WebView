import * as S from './AdminPage.style';

function AdminMainPage() {
 return (
   <S.Container>
     <S.PageTitle>대시보드</S.PageTitle>
     
     <S.StatsGrid>
       <S.StatCard>
         <S.StatTitle>총 사용자</S.StatTitle>
         <S.StatValue>1,367</S.StatValue>
         <S.StatChange isPositive>+12% ↑</S.StatChange>
       </S.StatCard>
       <S.StatCard>
         <S.StatTitle>이번 달 신규 가입</S.StatTitle>
         <S.StatValue>258</S.StatValue>
         <S.StatChange isPositive>+5% ↑</S.StatChange>
       </S.StatCard>
       <S.StatCard>
         <S.StatTitle>활성 사용자</S.StatTitle>
         <S.StatValue>892</S.StatValue>
         <S.StatChange>-2% ↓</S.StatChange>
       </S.StatCard>
     </S.StatsGrid>

     <S.Section>
       <S.SectionTitle>최근 가입한 사용자</S.SectionTitle>
       <S.Table>
         <thead>
           <tr>
             <S.Th>이름</S.Th>
             <S.Th>이메일</S.Th>
             <S.Th>가입일</S.Th>
             <S.Th>상태</S.Th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <S.Td>홍길동</S.Td>
             <S.Td>hong@example.com</S.Td>
             <S.Td>2024-01-08</S.Td>
             <S.Td><S.StatusBadge status="active">활성</S.StatusBadge></S.Td>
           </tr>
           {/* 더미 데이터 */}
         </tbody>
       </S.Table>
     </S.Section>
   </S.Container>
 );
}

export default AdminMainPage;