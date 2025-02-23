import { useQuery } from "@tanstack/react-query";
import { CustomerResponse } from "../../../types/api";
import { getCustomers } from "../api";

interface UseCustomerParams {
    page?: number;
    size?: number;
    search?: string;
}

export function useCustomers({page=1, size=10, search ='' }: UseCustomerParams){
    return useQuery<CustomerResponse>({
        queryKey: ['customers', page,size,search],
        queryFn: () => getCustomers(page,size,search),
        staleTime: 1000 * 60 * 5,
    });
}