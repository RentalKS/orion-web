import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocation } from "../api";

export function useUpdateLocation() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ locationId, updatedData }: { locationId: number; updatedData: Partial<Location> }) =>
        updateLocation(locationId, updatedData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['locations'] }); 
      },
      onError: (error) => {
        console.error('Error updating location:', error);
      },
    });
  }