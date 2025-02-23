import { useQuery } from "@tanstack/react-query";

interface FetchProps<T> {
  queryKey: string;
  fetchFn: (...args: any[]) => Promise<T>;
  params: any;
}

export function useFetchHook<T>({ queryKey, fetchFn, params }: FetchProps<T>) {
  return useQuery<T>({
    queryKey: [queryKey, params],
    queryFn: () => fetchFn(params.page, params.size, params.search),
    staleTime: 1000 * 60 * 5,
  });
}