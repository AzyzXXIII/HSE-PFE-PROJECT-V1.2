import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Add this import
import axios from "axios";

export function useLogin() {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth(); // Add this line

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      return response.data; // { token, user }
    },
    onSuccess: (data) => {
      // Update auth context (this will also update localStorage)
      setAuthUser(data.user, data.token); // Changed this line

      // Navigate to dashboard on successful login
      navigate("/dashboard"); // Changed from "/home" to "/dashboard"
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
