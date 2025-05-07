import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export function useEditEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(`/api/users/${id}`, data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      toast.success("Employee updated successfully");
      console.log("✅ Updated employee:", data);
      queryClient.invalidateQueries(["employees"]);
    },
    onError: (error) => {
      console.error("❌ Failed to update employee:", error);
      const message =
        error?.response?.data?.message || "Failed to update employee";
      toast.error(message);
    },
  });
}
