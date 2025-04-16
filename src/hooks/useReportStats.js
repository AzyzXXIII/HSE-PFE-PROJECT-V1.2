import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStats = async (type) => {
  const response = await axios.get(`/api/reports/stats?type=${type}`);
  return response.data;
};

export const useReportStats = (type) => {
  return useQuery({
    queryKey: ["reportStats", type],
    queryFn: () => fetchStats(type),
    staleTime: 0, // Always fetch fresh data
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
    retry: 1,
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnReconnect: true, // Refetch when network reconnects
    refetchInterval: 10000, // Refetch every 10 seconds
    enabled: true,
  });
};
