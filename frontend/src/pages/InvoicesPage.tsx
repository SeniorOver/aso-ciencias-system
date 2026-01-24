import { useEffect, useState } from 'react';
import axios from 'axios';

// 🔗 Conectamos con tu Gateway en AWS
const INVOICES_API = 'http://34.195.107.95:8080/invoices';

interface Invoice {
  id: string;
  saleId: string;
  amount: number;
  tax: number;
  customerEmail: string;
  status: string;
  createdAt: string;
}

export const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar facturas al entrar
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(INVOICES_API);
      setInvoices(res.data);
    } catch (error) {
      console.error('Error cargando facturas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (id: string) => {
    alert(`🖨️ Imprimiendo factura ${id.substring(0, 8)}...`);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-3">
        🧾 Facturación Electrónica
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Documentos Emitidos</h2>
          <button 
            onClick={fetchInvoices}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            🔄 Actualizar Lista
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold text-slate-600 text-sm">ID Factura</th>
                <th className="py-3 px-4 font-semibold text-slate-600 text-sm">Cliente</th>
                <th className="py-3 px-4 font-semibold text-slate-600 text-sm">Subtotal / IVA</th>
                <th className="py-3 px-4 font-semibold text-slate-600 text-sm">Total</th>
                <th className="py-3 px-4 font-semibold text-slate-600 text-sm">Estado</th>
                <th className="py-3 px-4 font-semibold text-slate-600 text-sm">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="p-4 text-center">Cargando...</td></tr>
              ) : invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-xs font-mono text-gray-500">{inv.id.substring(0, 8)}...</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{inv.customerEmail}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">
                    <div>Sub: ${(Number(inv.amount) - Number(inv.tax)).toFixed(2)}</div>
                    <div>IVA: ${Number(inv.tax).toFixed(2)}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">${Number(inv.amount).toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => handlePrint(inv.id)} className="text-gray-400 hover:text-blue-600">
                      🖨️
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && invoices.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 italic">
                    No hay facturas. ¡Ve a Ventas y vende algo! 🚀
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};