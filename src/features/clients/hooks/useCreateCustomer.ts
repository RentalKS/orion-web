import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "../api";
import { Customer } from "../../../types/api";

export function useCreateCustomer(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newCustomer: Omit<Customer, 'id' | 'createdAt'>) => createCustomer(newCustomer),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['customers']}); //refresh after adding new one
        },
        onError: (error) => {
            console.error('Error creating customer:', error);
        },
    })
}