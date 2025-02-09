import { Briefcase, DollarSign, CalendarCheck, BarChart3 } from "lucide-react";
const stats = [
  { title: "BOOKINGS", value: "1", icon: Briefcase, className: "bg-blue-50" },
  {
    title: "SALES",
    value: "$420.00",
    icon: DollarSign,
    className: "bg-green-50",
  },
  {
    title: "CHECK INS",
    value: "0",
    icon: CalendarCheck,
    className: "bg-violet-50",
  },
  {
    title: "OCCUPANCY RATE",
    value: "0%",
    icon: BarChart3,
    className: "bg-yellow-50",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className={`rounded-full p-2 ${stat.className}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-semibold">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Today</h2>
          <p className="mt-2 text-gray-500">No activity today...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Stay duration summary</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
