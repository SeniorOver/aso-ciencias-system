import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, Server } from 'lucide-react'; // ✅ Ahora sí los usaremos todos
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Por favor, llena todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://34.195.107.95:8080/auth/login', { 
        username, 
        password 
      });
      
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      
      toast.success('¡Acceso Autorizado!');
      setTimeout(() => navigate('/dashboard'), 1000);

    } catch (error) {
      console.error(error);
      toast.error('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Server className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">ASO System Login</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* INPUT USUARIO CON ICONO */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* INPUT PASSWORD CON ICONO */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Verificando...' : 'Entrar'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};