import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '@services/api';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  });
}
