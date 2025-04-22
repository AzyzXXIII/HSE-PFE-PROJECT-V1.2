import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const deleteEmployee = async (id) => {
  const res = await axios.delete(`/api/users/${id}`);
  return res.data;
};

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.success("Employee deleted");
      queryClient.invalidateQueries(["employees"]);
    },
    onError: () => {
      toast.error("Failed to delete employee");
    },
  });
}
