import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLocation } from "../api";

export function useCreateLocation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newLocation: Omit<Location, 'id' | 'createdAt'>) => createLocation(newLocation),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['locations']}); //refresh after adding new one
        },
        onError: (error) => {
            console.error('Error creating location:', error);
        },
    })
}