// useUpdateReport.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

export function useUpdateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, type, status, priority, historyAction }) => {
      const response = await axios.put(
        `${BASE_API_URL}/api/reports/${id}?type=${type}`,
        {
          status,
          priority,
          historyAction,
        }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate report list when update succeeds
      queryClient.invalidateQueries({ queryKey: ["reports", variables.type] });
    },
  });
}
