import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = 'http://34.195.107.95:8080';

export const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'CAJERO' });

  // Cargar usuarios
  const fetchUsers = () => {
    axios.get(`${API_URL}/auth/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchUsers(); }, []);

  // Crear usuario
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, newUser);
      toast.success('Usuario creado correctamente');
      setNewUser({ username: '', password: '', role: 'CAJERO' }); // Limpiar form
      fetchUsers(); // Recargar lista
    } catch (error) {
      toast.error('Error al crear usuario');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 text-slate-800">👥 Gestión de Usuarios</h1>

      {/* FORMULARIO CREAR */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Nuevo Usuario</h2>
        <form onSubmit={handleCreate} className="flex gap-4 flex-wrap items-end">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Usuario</label>
            <input 
              type="text" 
              className="border p-2 rounded-lg w-40" 
              placeholder="ej: juan_caja"
              value={newUser.username}
              onChange={e => setNewUser({...newUser, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contraseña</label>
            <input 
              type="text" 
              className="border p-2 rounded-lg w-40" 
              placeholder="******"
              value={newUser.password}
              onChange={e => setNewUser({...newUser, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rol</label>
            <select 
              className="border p-2 rounded-lg w-40 bg-white"
              value={newUser.role}
              onChange={e => setNewUser({...newUser, role: e.target.value})}
            >
              <option value="CAJERO">Cajero</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700">
            + Crear
          </button>
        </form>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-sm font-bold text-gray-600">Usuario</th>
              <th className="p-4 text-sm font-bold text-gray-600">Rol</th>
              <th className="p-4 text-sm font-bold text-gray-600">Contraseña</th>
              <th className="p-4 text-sm font-bold text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{u.username}</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{u.role}</span></td>
                <td className="p-4 text-gray-400 text-sm italic">🔒 Encriptada (Oculta)</td>
                <td className="p-4"><span className="text-green-600 font-bold text-xs">● Activo</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};