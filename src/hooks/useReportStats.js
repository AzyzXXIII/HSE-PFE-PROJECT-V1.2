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
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: true,
  });
};
