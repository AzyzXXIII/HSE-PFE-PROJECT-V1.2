import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateEmployeeStatus = async ({ id, action }) => {
  const endpoint = `/api/employees/${id}/${action}`;
  const res = await axios.patch(endpoint);
  return res.data;
};

export function useUpdateEmployeeStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployeeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });
}
