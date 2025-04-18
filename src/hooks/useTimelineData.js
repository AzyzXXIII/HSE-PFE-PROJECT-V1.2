import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const VALID_TYPES = ["incidents", "hazards", "observations", "nearMiss"];

export const useTimelineData = (type, last) => {
  const isValidType = VALID_TYPES.includes(type);

  return useQuery({
    queryKey: ["timeline", type, last],
    enabled: isValidType,
    queryFn: async () => {
      const response = await axios.get(
        `/api/reports/timeline?type=${type}${
          last && last !== "all" ? `&last=${last}` : ""
        }`
      );
      return (response.data || []).map((item) => ({
        month: item.month,
        count: item.count ?? 0,
      }));
    },
    refetchInterval: 10000,
    refetchIntervalInBackground: true,

    refetchOnWindowFocus: true,
    refetchOnReconnect: true,

    staleTime: 0,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
  });
};
