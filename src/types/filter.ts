// 차종 타입
export type CarType = 'SUV' | '경차' | '대형' | '상용' | '소형' | '스포츠카/쿠페' | '준중형' | '중대형';

// 색상 타입
export type CarColor = '갈색' | '검정' | '남색' | '녹색' | '은색' | '진주' | '파랑' | '하늘' | '회색' | '흰색' | '기타';

// 메인 필터 인터페이스
export interface CarFilterCondition {
  carTypes: CarType[];
  start_displacement: number;
  end_displacement: number;
  start_distance: number;
  end_distance: number;
  start_price: number;
  end_price: number;
  colors: CarColor[];
}

// 부분적 필터 조건을 위한 타입 (선택적 필드)
export type PartialCarFilterCondition = Partial<CarFilterCondition>;

// 단일 범위 조건을 위한 유틸리티 타입
export interface RangeCondition<T> {
  start: T;
  end: T;
}

// 각 범위 조건들을 위한 타입
export type DisplacementRange = RangeCondition<number>;
export type DistanceRange = RangeCondition<number>;
export type PriceRange = RangeCondition<number>;

// 필터 조건을 생성하는 유틸리티 함수
export const createFilterCondition = (condition: Partial<CarFilterCondition> = {}): CarFilterCondition => {
  return {
    carTypes: [],
    start_displacement: 0,
    end_displacement: 0,
    start_distance: 0,
    end_distance: 0,
    start_price: 0,
    end_price: 0,
    colors: [],
    ...condition,
  };
};
