import { useState } from "react";
import { FiHome, FiCalendar, FiUsers, FiSettings } from "react-icons/fi";
import { BsMoon, BsSun } from "react-icons/bs";

export default function DashboardLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">THE WILD OASIS</h1>
          <nav>
            <ul>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-gray-200">
                <FiHome /> Home
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer">
                <FiCalendar /> Bookings
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer">
                <FiUsers /> Users
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer">
                <FiSettings /> Settings
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200"
            >
              {darkMode ? <BsSun /> : <BsMoon />}
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="bg-white p-4 shadow rounded-lg">
            Main Content Goes Here
          </div>
        </main>
      </div>
    </div>
  );
}
