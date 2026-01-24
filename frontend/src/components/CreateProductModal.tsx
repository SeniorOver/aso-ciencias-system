import { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Para recargar la tabla al terminar
}

export const CreateProductModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Snacks' // Valor por defecto
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convertimos números (el input devuelve string)
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      // 🚀 ENVIAR A AWS
      await api.post('/inventory', payload);
      
      toast.success('Producto creado exitosamente');
      onSuccess(); // Recargamos la tabla de atrás
      onClose(); // Cerramos el modal
      
      // Limpiamos el formulario
      setFormData({ name: '', description: '', price: '', stock: '', category: 'Snacks' });

    } catch (error) {
      console.error(error);
      toast.error('Error al guardar en el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Nuevo Producto</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Gatorade Azul"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Descripción</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Botella 500ml"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Precio ($)</label>
              <input 
                required
                type="number" step="0.01"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Stock Inicial</label>
              <input 
                required
                type="number"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Categoría</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="Snacks">Snacks</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Servicios">Servicios (Alquiler/Impresión)</option>
              <option value="Papeleria">Papelería</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};