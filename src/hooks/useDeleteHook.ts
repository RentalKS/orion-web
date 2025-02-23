import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteProps {
  mutationFn: (id: number) => Promise<any>;
  queryKey: string;
}

export function useDeleteHook({ mutationFn, queryKey }: DeleteProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      console.error(`Error deleting ${queryKey}:`, error);
    },
  });
}