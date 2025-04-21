// src/features/employees/useEmployees.js
import { useQuery } from "@tanstack/react-query";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();

      return data.map((user) => ({
        id: user.id,
        username: user.email.split("@")[0],
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.phone,
        address: "-", // Placeholder
        titleId: user.role_id,
        departmentId: user.location_id,
        status: user.status || "pending",
      }));
    },
  });
}
