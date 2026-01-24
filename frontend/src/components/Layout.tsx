import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

export const Layout = () => {
  const navigate = useNavigate();
  // En escritorio inicia ABIERTO (true), en móvil CERRADO (false)
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* BOTÓN HAMBURGUESA (SOLO MÓVIL) */}
      <button 
        onClick={() => setMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        ${isSidebarOpen ? 'lg:w-64' : 'lg:w-20'} 
      `}>
        
        {/* CABECERA SIDEBAR */}
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 animate-fadeIn">
              <div className="bg-blue-600 p-2 rounded-lg font-bold">A</div>
              <span className="text-xl font-bold italic">System</span>
            </div>
          ) : (
            <div className="bg-blue-600 p-2 rounded-lg font-bold mx-auto">A</div>
          )}
          
          {/* Botón para colapsar en escritorio */}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="hidden lg:block text-gray-400 hover:text-white">
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* NAVEGACIÓN (CON EMOJIS DE NUEVO 🎨) */}
        <nav className="flex-1 px-3 space-y-2 mt-4 overflow-y-auto">
          <NavItem to="/dashboard" emoji="🏁" label="Inicio" isOpen={isSidebarOpen} end />
          <NavItem to="/dashboard/inventory" emoji="📦" label="Inventario" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/sales" emoji="💰" label="Caja / Ventas" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/invoices" emoji="🧾" label="Facturas" isOpen={isSidebarOpen} />
          
          <div className={`pt-4 pb-2 text-xs text-gray-500 font-bold uppercase ${!isSidebarOpen && 'text-center'}`}>
            {isSidebarOpen ? 'Administración' : '•••'}
          </div>
          
          <NavItem to="/dashboard/users" emoji="👥" label="Usuarios" isOpen={isSidebarOpen} />
          <NavItem to="/dashboard/audit" emoji="📈" label="Auditoría" isOpen={isSidebarOpen} />
        </nav>

        {/* FOOTER (LOGOUT) */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} /> 
            {isSidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* FONDO OSCURO EN MÓVIL */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} w-full pt-16 lg:pt-0`}>
        <Outlet />
      </main>
    </div>
  );
};

// Componente auxiliar para los links
const NavItem = ({ to, emoji, label, isOpen, end = false }: any) => (
  <NavLink 
    to={to} 
    end={end}
    className={({ isActive }) => `
      flex items-center gap-3 px-3 py-3 rounded-lg transition-all
      ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}
      ${!isOpen && 'justify-center'}
    `}
  >
    <span className="text-xl">{emoji}</span>
    {isOpen && <span className="animate-fadeIn">{label}</span>}
  </NavLink>
);