import { useEffect, useState } from 'react';
import { Plus, Search, Trash2, Edit, Package } from 'lucide-react';
import api from '../api/axios';
import type { Product } from '../types';
import { CreateProductModal } from '../components/CreateProductModal'; // <--- IMPORTAR

export const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- ESTADO PARA ABRIR/CERRAR

  const fetchProducts = async () => {
    setLoading(true); // Ponemos loading cada vez que refrescamos
    try {
      const response = await api.get('/inventory'); 
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      // Datos de prueba solo si falla
      setProducts([
        { id: '1', name: 'Coca Cola 500ml', description: 'Bebida gaseosa fría', price: 1.50, stock: 45, category: 'Bebidas' },
        { id: '2', name: 'Doritos Picantes', description: 'Paquete mediano', price: 0.75, stock: 20, category: 'Snacks' },
        { id: '3', name: 'Alquiler Control PS5', description: 'Por hora', price: 2.00, stock: 4, category: 'Servicios' },
      ]);
      // Quitamos el toast de error para no spamear, solo log en consola
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* --- AQUÍ PONEMOS EL MODAL (Invisible hasta que se active) --- */}
      <CreateProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts} // Cuando guarde, recargamos la tabla
      />

      {/* Cabecera */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Inventario</h1>
          <p className="text-slate-400">Tienda de Estudiantes</p>
        </div>
        
        {/* BOTÓN CONECTADO AL ESTADO */}
        <button 
          onClick={() => setIsModalOpen(true)} // <--- AHORA ABRE EL MODAL
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* ... (El resto de la tabla sigue igual, no cambies nada abajo) ... */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        {/* ... (código de la tabla que ya tenías) ... */}
        {/* Solo asegúrate de copiar el return completo si dudas, o deja la tabla como estaba */}
        <div className="p-4 border-b border-slate-700">
            <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input 
                type="text" 
                placeholder="Buscar producto..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs font-semibold">
                <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
                {loading ? (
                <tr><td colSpan={5} className="text-center p-8 text-slate-400">Cargando inventario...</td></tr>
                ) : products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-700 p-2 rounded-lg text-blue-400">
                        <Package className="w-5 h-5" />
                        </div>
                        <div>
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-sm text-slate-500">{product.description}</div>
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4">
                    <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-600">
                        {product.category}
                    </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-green-400">
                    ${product.price}
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-white">{product.stock} un.</span>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-900/30 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};