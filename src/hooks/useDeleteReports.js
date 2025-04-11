import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteReport = async ({ id, type }) => {
  const response = await fetch(
    `http://localhost:5000/api/reports/${id}?type=${type}`,
    { method: "DELETE" }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete report");
  }

  return response.json();
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReport,
    onSuccess: (_, variables) => {
      console.log("✅ Report deleted!");
      queryClient.invalidateQueries(["reports", variables.type]);
    },
    onError: (error) => {
      console.error("❌ Error deleting report:", error.message);
    },
  });
};
