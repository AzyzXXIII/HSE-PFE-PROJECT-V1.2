// src/hooks/useUpdateUserStatus.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Keep the action system and API path structure the same
const updateStatus = async ({ id, action }) => {
  const res = await axios.patch(`/api/users/${id}/${action}`);
  return res.data;
};

// ✅ Renamed the hook to useUpdateUserStatus
export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: (data, variables) => {
      const { action } = variables;

      const toastOptions = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      };

      // ✅ Toast messages now use "User" instead of "Employee"
      switch (action) {
        case "accept":
          toast.success("✅ User Accepted", {
            ...toastOptions,
            theme: "colored",
          });
          break;
        case "reject":
          toast.error("❌ User Rejected", {
            ...toastOptions,
            theme: "dark",
          });
          break;
        case "block":
          toast.warning("🔒 User Blocked", {
            ...toastOptions,
            theme: "light",
            autoClose: 5000,
          });
          break;
        case "unblock":
          toast.info("🔓 User Unblocked", {
            ...toastOptions,
            theme: "colored",
          });
          break;
        default:
          toast("ℹ️ Status updated", toastOptions);
      }

      // ✅ Update users cache
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      toast.error("❌ Failed to update user status", {
        position: "top-right",
        theme: "dark",
      });
    },
  });
}
