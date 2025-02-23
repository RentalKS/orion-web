import { useQuery } from "@tanstack/react-query";
import { LocationResponse } from "../../../types/api";
import { getLocations } from "../api";

interface UseLocationParams {
  page?: number;
  size?: number;
  search?: string;
}

export function useLocations({page=1, size=10, search ='' }: UseLocationParams){
  return useQuery<LocationResponse>({
      queryKey: ['locations', page,size,search],
      queryFn: () => getLocations(page,size,search),
      staleTime: 1000 * 60 * 5,
  });
}