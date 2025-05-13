import { useQuery } from "@tanstack/react-query";

const fetchReports = async (reportType) => {
  const response = await fetch(
    `http://localhost:5000/api/reports?type=${reportType}`
  );
  if (!response.ok) throw new Error("Failed to fetch reports");
  return response.json();
};

export const useReports = (reportType) => {
  return useQuery({
    queryKey: ["reports", reportType],
    queryFn: () => fetchReports(reportType),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
