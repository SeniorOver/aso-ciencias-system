import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { InventoryPage } from './pages/InventoryPage';
import { SalesPage } from './pages/SalesPage';
import { Layout } from './components/Layout';
import { InvoicesPage } from './pages/InvoicesPage'; // <--- Importado correctamente
import { UsersPage } from './pages/UsersPage';
import { AuditPage } from './pages/AuditPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública: Login */}
        <Route path="/" element={<LoginPage />} />
 
        {/* Rutas Privadas (Con Menú Lateral) */}
        <Route path="/dashboard" element={<Layout />}>
          
          {/* Inicio */}
          <Route index element={<DashboardPage />} />
          
          {/* Inventario */}
          <Route path="inventory" element={<InventoryPage />} /> 

          {/* Ventas */}
          <Route path="sales" element={<SalesPage />} />

          {/* 👇 NUEVA RUTA DE FACTURAS 👇 */}
          <Route path="invoices" element={<InvoicesPage />} />
          
          {/* Futuros Módulos */}
          <Route path="users" element={<UsersPage />} />
          <Route path="audit" element={<AuditPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;