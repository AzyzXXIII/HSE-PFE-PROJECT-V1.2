import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStats = async (type, filter) => {
  const response = await axios.get(`/api/reports/stats`, {
    params: {
      type,
      last: filter, // e.g. "7", "30", "90", "all"
    },
  });
  return response.data;
};

export const useReportStats = (type, filter = "all") => {
  return useQuery({
    queryKey: ["reportStats", type, filter],
    queryFn: () => fetchStats(type, filter),
    staleTime: 0,
    cacheTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60,
    enabled: true,
  });
};
