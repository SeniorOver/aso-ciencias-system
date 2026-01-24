import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Box, Users, Activity, LogOut } from 'lucide-react';

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Borramos la llave
    navigate('/'); // Lo mandamos al login
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
    { path: '/dashboard/inventory', icon: Box, label: 'Inventario' },
    { path: '/dashboard/users', icon: Users, label: 'Usuarios' },
    { path: '/dashboard/audit', icon: Activity, label: 'Auditoría' },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen flex flex-col">
      {/* Logo del Menú */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-700">
        <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <span className="text-white font-bold text-xl">ASO System</span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'} // Solo exacto para el home
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Botón Salir */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};