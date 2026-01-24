import { useEffect, useState } from 'react';
import axios from 'axios';

// URLs de tus microservicios (Gateway)
const SALES_API = 'http://34.195.107.95:8080/sales';
const INVENTORY_API = 'http://34.195.107.95:8080/inventory'; // Para llenar el select

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Sale {
  id: string;
  productId: string;
  totalPrice: number;
  quantity: number;
  soldAt: string;
}

export const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]); // Lista de productos para el select
  const [loading, setLoading] = useState(false);

  // Formulario
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);

  // 1. Cargar Ventas e Inventario al iniciar
  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get(SALES_API);
      setSales(res.data);
    } catch (error) {
      console.error('Error cargando ventas:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(INVENTORY_API);
      setProducts(res.data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  // Cuando el usuario selecciona un producto del menú
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prodId = e.target.value;
    setSelectedProductId(prodId);

    // Buscamos el producto para saber su precio automático
    const product = products.find(p => p.id.toString() === prodId); // toString por si acaso
    if (product) {
      setCurrentPrice(product.price);
    } else {
      setCurrentPrice(0);
    }
  };

  // 2. Crear Venta
  const handleSell = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) return alert('Selecciona un producto');

    setLoading(true);
    try {
      // Calculamos el total
      const total = currentPrice * quantity;

      await axios.post(SALES_API, {
        productId: selectedProductId,
        totalPrice: total,
        quantity: Number(quantity),
      });

      alert(`✅ ¡Venta registrada! Total: $${total}`);
      fetchSales(); // Recargar historial
      
      // Resetear form
      setSelectedProductId('');
      setQuantity(1);
      setCurrentPrice(0);
    } catch (error) {
      console.error(error);
      alert('Error al procesar la venta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-3">
        💰 Punto de Venta <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-normal">Online</span>
      </h1>

      {/* --- AQUÍ ESTÁ LA CLAVE DE LA RESPONSIVIDAD --- */}
      {/* En pantallas pequeñas: 1 columna. En pantallas medianas o más grandes: 3 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- COLUMNA IZQUIERDA: CAJA --- */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Nueva Transacción</h2>
            <form onSubmit={handleSell} className="space-y-4">
              
              {/* SELECTOR DE PRODUCTOS */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Producto</label>
                <select 
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                  value={selectedProductId}
                  onChange={handleProductChange}
                  required
                >
                  <option value="">-- Selecciona un producto --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ${p.price} (Stock: {p.stock})
                    </option>
                  ))}
                </select>
              </div>

              {/* CANTIDAD */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Cantidad</label>
                <input 
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  required
                />
              </div>

              {/* RESUMEN DE PRECIO */}
              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-500">Total a Pagar:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${(currentPrice * quantity).toFixed(2)}
                </span>
              </div>

              <button 
                type="submit" 
                disabled={loading || !selectedProductId}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-95 duration-150"
              >
                {loading ? 'Procesando...' : '💸 COBRAR AHORA'}
              </button>
            </form>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: HISTORIAL --- */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Historial de Ventas</h2>
            {/* El contenedor con overflow-x-auto permite el scroll horizontal en pantallas pequeñas */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Venta</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Producto ID</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cant.</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-xs text-gray-400 font-mono">{sale.id.substring(0, 8)}...</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">{sale.productId}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{sale.quantity}</td>
                      <td className="py-3 px-4 text-sm font-bold text-green-600">${Number(sale.totalPrice).toFixed(2)}</td>
                      <td className="py-3 px-4 text-xs text-gray-500">{new Date(sale.soldAt || Date.now()).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {sales.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400 italic">
                        No has vendido nada hoy. ¡Ánimo! 🚀
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};