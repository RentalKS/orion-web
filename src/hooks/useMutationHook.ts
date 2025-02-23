import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationProps<T>{
    mutationFn: (data: T) => Promise<any>;
    queryKey: string;
}

export function useMutationHook<T>({mutationFn, queryKey}: MutationProps<T>){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]});
        },
        onError:(error) => {
            console.log(`Error in ${queryKey} operation`, error);
        }
    })
}