import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const VALID_TYPES = ["incidents", "hazards", "observations", "nearMiss"];

export const useTimelineData = (type) => {
  const isValidType = VALID_TYPES.includes(type);

  return useQuery({
    queryKey: ["timeline", type],
    enabled: isValidType, // only run if valid
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/reports/timeline?type=${type}`);

        // Ensure each item has a consistent shape
        return (response.data || []).map((item) => ({
          month: item.month,
          count: item.count ?? 0, // fallback to 0 if undefined
        }));
      } catch (error) {
        console.error(`Error fetching timeline data for type: ${type}`, error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
