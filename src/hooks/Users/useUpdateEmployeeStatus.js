import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const updateStatus = async ({ id, action }) => {
  const res = await axios.patch(`/api/users/${id}/${action}`);
  return res.data;
};

export function useUpdateEmployeeStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: (data, variables) => {
      toast.success(
        `Employee ${variables.action === "accept" ? "accepted" : "rejected"}`
      );
      queryClient.invalidateQueries(["employees"]);
    },
    onError: () => {
      toast.error("Failed to update employee status");
    },
  });
}
