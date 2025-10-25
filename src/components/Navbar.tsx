import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiBell, FiBarChart2, FiUser } from 'react-icons/fi';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/add', label: 'Add', icon: FiPlusCircle },
  { to: '/reminders', label: 'Reminders', icon: FiBell },
  { to: '/insights', label: 'Insights', icon: FiBarChart2 },
  { to: '/login', label: 'Account', icon: FiUser }
];

export default function Navbar() {
  const loc = useLocation();
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">FS</div>
          <div>
            <div className="font-semibold">FinSync</div>
            <div className="text-xs text-gray-500">All Your Finances, One Dashboard</div>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          {navItems.map(n => {
            const Icon = n.icon;
            const isActive = loc.pathname === n.to;
            return (
              <Link 
                key={n.to} 
                to={n.to} 
                className={`px-3 py-2 rounded-md flex items-center gap-2 text-sm ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Icon className="text-lg" />
                <span className="hidden sm:inline">{n.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
