import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      axios.post("/api/users", data).then((res) => res.data),
    onSuccess: () => {
      toast.success("Employee created");
      queryClient.invalidateQueries(["employees"]);
    },
    onError: () => {
      toast.error("Failed to create employee");
    },
  });
}
