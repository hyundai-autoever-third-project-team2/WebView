import styled from 'styled-components';
import { media } from 'styles/media';
import { LAYOUT } from 'styles/constants';
import { Swiper } from 'swiper/react';
import Bell from 'assets/icon_notification_white.svg?react';

export const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${LAYOUT.TOOLBAR_HEIGHT};
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  justify-content: space-between;
`;

export const HeaderInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Logo = styled.img``;

export const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral900};
`;

export const NotificationButton = styled(Bell)`
  path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

export const HomePageContainer = styled.div`
  padding: 80px 16px 0;

  ${media.mobile} {
    padding: 80px 20px 0;
  }

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

export const IconSection = styled.div`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 20px;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral900};
  gap: 5px;
  font-size: 12px;
  white-space: nowrap;
`;

export const IconInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 40px;
  height: 40px;
`;

export const AdSection = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral50};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: 20px;
  height: auto;
  justify-content: center;
  align-items: center;
`;

export const Advertisement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const RecommendationSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 8px;
  background-color: #090160;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.neutral50};
  padding: 15px 15px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  background: linear-gradient(180deg, #e67e00 0%, #ff9d00 50%, #ffbf66 100%);

  h3 {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

export const RecommendationSubTitle = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  svg {
    margin-left: 5px;
  }
`;

export const RecommendationCarCard = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  cursor: pointer;
`;

export const CarCardImage = styled.img`
  width: 40%;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

export const CarCardInfo = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export const CarName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const CarYear = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export const RecommendationRefreshButton = styled.button``;

export const StyledAdSwiper = styled(Swiper)`
  width: 100%;
  height: auto;

  .swiper-pagination {
    display: flex;
    justify-content: center;
  }

  .swiper-slide {
    width: auto;
  }

  .swiper-pagination-bullet {
    background: #d3e3f8;
    opacity: 0.5;
    margin: 0 4px;
    width: 4px;
    height: 4px;

    &-active {
      opacity: 1;
      width: 12px;
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  }
`;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: auto;
  padding-bottom: 20px;

  .swiper-pagination {
    display: flex;
    justify-content: center;
  }

  .swiper-slide {
    width: auto;
  }

  .swiper-pagination-bullet {
    background: #d3e3f8;
    opacity: 0.5;
    /* margin: 0 4px; */
    width: 4px;
    height: 4px;

    &-active {
      opacity: 1;
      width: 12px;
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  }
`;

export const CarListSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 15px;

  & > div {
    padding: 5px 0;
  }
`;

export const TitleWithArrowButton = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral900};

  svg {
    margin: 0px;
    justify-content: flex-end;
  }
`;

export const CarListCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

export const CarListCardImage = styled.img`
  width: 30%;
  height: 70px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const CarListCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;
  gap: 5px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

export const AllCarListButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  background-color: #fff;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  svg {
    margin: 0px;
  }
`;

export const FeedPreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 20px;
`;

export const FeedPreviewCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FeedPreviewCard = styled.img`
  width: 32%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

export const AnnouncementSection = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  padding: 20px;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.md};
  background-color: ${({ theme }) => theme.colors.neutral50};

  span {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.neutral50};
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  color: ${({ theme }) => theme.colors.neutral900};
`;

export const CarListItemWrapper = styled.div`
  display: flex;
  width: 100%;
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
  gap: 10px;
`;
