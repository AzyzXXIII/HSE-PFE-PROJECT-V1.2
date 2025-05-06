import { useQuery } from "@tanstack/react-query";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    select: (data) =>
      data.map((user) => {
        const username = user.email?.includes("@")
          ? user.email.split("@")[0]
          : user.email ?? "";

        const firstName = user.first_name ?? "";
        const lastName = user.last_name ?? "";
        const fullName = `${firstName} ${lastName}`.trim();
        console.log(user);
        return {
          id: user.id,
          username,
          firstName,
          lastName,
          fullName,
          email: user.email ?? "",
          phone: user.phone ?? "",
          role: user.role_name,
          location: user.location_name ?? "Unknown",
          status: user.status ?? "pending",
          qrCode: user.qr_code ?? null,
        };
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 3000),
    refetchOnWindowFocus: false, // optional, disables auto-refetch on tab switch
  });
}
