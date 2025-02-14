import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Customer } from "../../../types/api";
import { updateCustomer } from "../api";

export function useUpdateCustomer() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ customerId, updatedData }: { customerId: number; updatedData: Partial<Customer> }) =>
        updateCustomer(customerId, updatedData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customers'] }); 
      },
      onError: (error) => {
        console.error('Error updating customer:', error);
      },
    });
  }