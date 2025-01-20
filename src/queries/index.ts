import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { car } from './car';
import { notification } from './notification';

export const queries = mergeQueryKeys(car, notification);
