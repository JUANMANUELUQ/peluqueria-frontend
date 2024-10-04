import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import RegistroCuentaClientes from './RegistroCuentaClientes';
import ClienteIndex from "./ClienteIndex";
import EmpleadoIndex from "./EmpleadoIndex";
import AdminIndex from "./AdminIndex";
import ProductForm from "./components/RegisterProductView/ProductForm";// Asegúrate de tener este componente

const App = () => {
    useEffect(() => {
        // Solo inicializa si no existe
        if (sessionStorage.getItem('LoginCliente') === null) {
            sessionStorage.setItem('LoginCliente', "");
            sessionStorage.setItem('LoginCliente', "");
        }
        if (sessionStorage.getItem('LoginEmpleado') === null) {
            sessionStorage.setItem('LoginEmpleado', "");
            sessionStorage.setItem('LoginEmpleado', "");
        }
    }, []);
  return (
      <Routes>
          {/* Rutas definidas sin anidación */}
          <Route path="/" element={<Login />} />
          <Route path="/RegistroCuentaClientes" element={<RegistroCuentaClientes />} />
          <Route path="/ClienteIndex" element={<ClienteIndex />} />
          <Route path="/EmpleadoIndex" element={<EmpleadoIndex />} />
          <Route path="/AdminIndex" element={<AdminIndex />} />
          <Route path="/ProductForm" element={<ProductForm />} /> {/* Nueva ruta para ProductForm */}
      </Routes>
  );
};

export default App;
