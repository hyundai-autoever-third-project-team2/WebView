// components/Skeleton/index.tsx
import { CSSProperties } from 'react';
import * as S from './Skeleton.style';

interface SkeletonProps {
  // 기본 속성
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;

  // 변형 옵션
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';

  // 반복 옵션
  repeat?: number;

  // 스타일 커스텀
  style?: CSSProperties;
  className?: string;
}

function Skeleton({
  width,
  height,
  borderRadius,
  variant = 'rectangular',
  animation = 'wave',
  repeat = 1,
  style,
  className,
}: SkeletonProps) {
  const renderSkeleton = () => (
    <S.SkeletonItem
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      $variant={variant}
      $animation={animation}
      style={style}
      className={className}
    />
  );

  if (repeat === 1) return renderSkeleton();

  return (
    <S.SkeletonWrapper>
      {Array.from({ length: repeat }, (_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </S.SkeletonWrapper>
  );
}

// 자주 사용되는 프리셋 컴포넌트들
Skeleton.Text = (props: Omit<SkeletonProps, 'variant'>) => <Skeleton variant="text" height="1em" {...props} />;

Skeleton.Circle = (props: Omit<SkeletonProps, 'variant'>) => <Skeleton variant="circular" {...props} />;

Skeleton.Button = (props: Omit<SkeletonProps, 'variant'>) => (
  <Skeleton width="120px" height="40px" borderRadius="20px" {...props} />
);

export default Skeleton;
