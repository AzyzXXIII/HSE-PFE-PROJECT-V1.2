import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export function useLogin() {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      return response.data; // { token, user }
    },
    onSuccess: (data) => {
      const { user, token } = data;
      setAuthUser(user, token);

      // 🔁 Redirect based on permission
      if (user.permissions?.includes("view_dashboard")) {
        navigate("/dashboard");
      } else if (user.permissions?.includes("manage_users")) {
        navigate("/employees");
      } else if (user.role_name === "Supervisor") {
        navigate("/reportCategory");
      } else if (user.permissions?.length > 0) {
        navigate("/account"); // or any page they are allowed
      } else {
        navigate("/unauthorized");
      }
    },
    onError: (err) => {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
