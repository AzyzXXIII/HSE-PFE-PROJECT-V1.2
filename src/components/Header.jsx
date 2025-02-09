import { Moon, Bell } from "lucide-react";

const dateFilters = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          {dateFilters.map((filter) => (
            <button
              key={filter.value}
              className={`px-3 py-1 text-sm rounded ${
                filter.value === "7" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Moon className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
