import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getCarDetail } from 'api/carDetail/carDetailApi';

export const car = createQueryKeys('car', {
  all: null,
  detail: (carId: number) => ({
    queryKey: ['carDetail'],
    queryFn: () => getCarDetail(carId),
  }),
});
