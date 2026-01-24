import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AUDIT_API = 'http://34.195.107.95:3009';
export const AuditPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener logs
  const fetchLogs = async () => {
    try {
      const res = await axios.get(AUDIT_API);
      setLogs(res.data);
    } catch (error) {
      console.error("Error al leer logs", error);
    }
  };

  // Función para crear log manual
  const createTestLog = async () => {
    setLoading(true);
    try {
      await axios.post(AUDIT_API, {
        action: 'TEST_EVENT',
        userId: 'admin_test',
        details: 'Prueba de conexión con Auditoría Mongo'
      });
      toast.success('Evento registrado en Mongo');
      fetchLogs(); // Recargar lista
    } catch (error) {
      console.error(error);
      toast.error('Error: No se pudo conectar con Audit Service');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // Intenta crear uno al entrar automáticamente
    createTestLog();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">📈 Auditoría del Sistema</h1>
        <button 
          onClick={createTestLog} 
          disabled={loading}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 text-sm font-bold disabled:opacity-50"
        >
          {loading ? 'Enviando...' : '🔄 Simular Evento'}
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700 text-green-400 font-mono text-sm">
        <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
          <span>root@aso-system:~/logs/mongo# tail -f audit.log</span>
          <span className="animate-pulse text-red-400 font-bold">● REC</span>
        </div>
        <div className="p-6 h-[500px] overflow-y-auto space-y-3 bg-black/20">
          {logs.length > 0 ? logs.map((log, i) => (
            <div key={i} className="flex gap-4 border-b border-slate-800/50 pb-2 hover:bg-white/5 transition-colors p-2 rounded">
              <span className="text-gray-500 min-w-[80px]">
                {new Date(log.createdAt).toLocaleTimeString()}
              </span>
              <span className={`font-bold min-w-[120px] ${log.action === 'TEST_EVENT' ? 'text-blue-400' : 'text-yellow-400'}`}>
                {log.action}
              </span>
              <span className="text-gray-300 flex-1">{log.details}</span>
              <span className="text-purple-400 text-xs border border-purple-400/30 px-2 rounded">
                User: {log.userId}
              </span>
            </div>
          )) : (
            <div className="text-gray-500 italic text-center py-20">
              Conectando con base de datos de logs...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};