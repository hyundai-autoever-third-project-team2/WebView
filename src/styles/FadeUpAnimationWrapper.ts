import styled from 'styled-components';

export const FadeUpAnimationWrapper = styled.div`
  animation: fadeUp 0.3s ease;
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
