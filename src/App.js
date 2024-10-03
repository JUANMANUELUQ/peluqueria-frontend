import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import RegistroCuentaClientes from './RegistroCuentaClientes';
import ClienteIndex from "./ClienteIndex";
import EmpleadoIndex from "./EmpleadoIndex";
import AdminIndex from "./AdminIndex";  // Asegúrate de tener este componente

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
        <Route path="/" element={<Login />} />
        <Route path="/RegistroCuentaClientes" element={<RegistroCuentaClientes />} />
          <Route path="/ClienteIndex" element={<ClienteIndex />} />
          <Route path="/EmpleadoIndex" element={<EmpleadoIndex />} />
          <Route path="/AdminIndex" element={<AdminIndex />} />
      </Routes>
  );
};

export default App;
