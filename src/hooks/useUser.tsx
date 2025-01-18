import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from 'api/user/userApi';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await getUserInfo();
      return response;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
