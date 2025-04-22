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
        firstName: user.first_name,
        lastName: user.last_name,
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.phone,
        titleId: user.role_name,
        departmentId: user.location_name,
        status: user.status || "pending",
        can_send_reports: user.can_send_reports, // Make sure the names match here
        can_edit_reports: user.can_edit_reports, // Same for other fields
        can_delete_reports: user.can_delete_reports,
        qrCode: user.qr_code,
      }));
    },
  });
}
