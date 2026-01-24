import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ANALYTICS_API = 'http://34.195.107.95:8080/analytics';

export const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    recentSales: []
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get(ANALYTICS_API);
      setStats(res.data);
    } catch (error) {
      console.error('Error analytics:', error);
      // No bloqueamos la UI si falla, solo mostramos ceros
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 flex-col gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Conectando con Microservicios...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-gray-500">Bienvenido al sistema distribuido ASO System</p>
        </div>
        <div className="flex gap-2">
           <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-300 animate-pulse">Online</span>
        </div>
      </div>

      {/* TARJETAS DE DATOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium">Ingresos Totales</p>
            <p className="text-4xl font-bold text-slate-800 mt-2">${stats.totalRevenue}</p>
          </div>
          <div className="text-4xl">💰</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium">Ventas Totales</p>
            <p className="text-4xl font-bold text-slate-800 mt-2">{stats.totalSales}</p>
          </div>
          <div className="text-4xl">🧾</div>
        </div>

        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-center gap-3">
          <p className="font-bold text-lg">Accesos Rápidos</p>
          <div className="flex gap-2">
            <Link to="/dashboard/sales" className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-center text-sm font-bold transition-colors">
              Nueva Venta
            </Link>
            <Link to="/dashboard/inventory" className="flex-1 bg-slate-600 hover:bg-slate-500 py-2 rounded-lg text-center text-sm font-bold transition-colors">
              Inventario
            </Link>
          </div>
        </div>
      </div>

      {/* ESTADO DE SERVICIOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-slate-700 mb-4">📡 Estado de Microservicios</h3>
          <div className="space-y-3">
             <ServiceStatus name="Inventory Service" port="3001" status="Active" />
             <ServiceStatus name="Sales Service" port="3002" status="Active" />
             <ServiceStatus name="Analytics Service" port="3004" status="Active" />
             <ServiceStatus name="Invoice Service" port="3006" status="Active" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceStatus = ({ name, port, status }: any) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <div>
        <p className="font-bold text-sm text-slate-700">{name}</p>
        <p className="text-xs text-gray-400">Port: {port}</p>
      </div>
    </div>
    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">{status}</span>
  </div>
);