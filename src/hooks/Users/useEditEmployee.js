import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export function useEditEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      axios.put(`/api/users/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      toast.success("Employee updated");
      queryClient.invalidateQueries(["employees"]);
    },
    onError: () => {
      toast.error("Failed to update employee");
    },
  });
}
