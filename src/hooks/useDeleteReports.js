import { useMutation, useQueryClient } from "@tanstack/react-query";

// Function to send DELETE request
const deleteReport = async ({ id, type }) => {
  const response = await fetch(
    `http://localhost:5000/api/reports/${id}?type=${type}`,
    { method: "DELETE" }
  );

  // Check if the response is not okay, throw an error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete report");
  }

  // Return the response data (for refetch or other purposes)
  return response.json();
};

// Hook for deleting a report
export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      console.log("✅ Report deleted!");
      queryClient.invalidateQueries(["reports"]); // Refetch the reports list
    },
    onError: (error) => {
      console.error("❌ Error deleting report:", error.message);
    },
  });
};
