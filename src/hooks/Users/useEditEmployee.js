// src/hooks/Users/useEditEmployee.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Using PATCH instead of PUT
export function useEditEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.patch(`/api/users/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("✅ Employee updated successfully");
      console.log("✅ Updated employee:", data);
      queryClient.invalidateQueries(["employees"]);
    },
    onError: (error) => {
      console.error("❌ Failed to update employee:", error);
      const message =
        error?.response?.data?.error || "Failed to update employee";
      toast.error(message);
    },
  });
}
