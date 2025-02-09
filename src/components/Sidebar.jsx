import { Link } from "react-router-dom";
import { Home, CalendarDays, Building2, Users2, Settings } from "lucide-react";
import Logo from "./Logo";

const menuItems = [
  { title: "Home", icon: Home, path: "/" },
  { title: "reports", icon: CalendarDays, path: "/reports" },
  { title: "permissions", icon: Building2, path: "/permissions" },
  { title: "Users", icon: Users2, path: "/users" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r">
      <div className="p-4 border-b">
        <Logo />
      </div>
      <nav className="p-2">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
