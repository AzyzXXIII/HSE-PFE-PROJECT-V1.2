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
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
