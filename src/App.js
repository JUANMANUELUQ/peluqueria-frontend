
import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import RegistroCuentaClientes from './RegistroCuentaClientes';
import ClienteIndex from "./ClienteIndex";
import EmpleadoIndex from "./EmpleadoIndex";
import AdminIndex from "./AdminIndex";
import ProductForm from "./components/RegisterProductView/ProductForm";
import {RegistroUsuario} from "./pages/registerUser/RegistroUsuario";
import {InicioSesion} from "./pages/login/InicioSesion";
import {RegisterEmployee} from "./pages/registerUser/RegisterEmployee";

// Asegúrate de tener este componente

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
          <Route path="/" element={<InicioSesion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegistroCuentaClientes" element={<RegistroCuentaClientes />} />
          <Route path="/RegistroUsuario" element={<RegistroUsuario />} />
          <Route path="/ClienteIndex" element={<ClienteIndex />} />
          <Route path="/EmpleadoIndex" element={<EmpleadoIndex />} />
          <Route path="/AdminIndex" element={<AdminIndex />} />
          <Route path="/RegistroEmpleado" element={<RegisterEmployee />} />
          <Route path="/ProductForm" element={<ProductForm />} /> {/* Nueva ruta para ProductForm */}
      </Routes>
  );
};

export default App;

/**
 * import React from 'react';
 * import './App.css'; // Importa tus estilos globales
 * import AppointmentBooking from './components/AppointmentBooking'; // Ajusta la ruta según tu estructura de proyecto
 *
 * function App() {
 *   return (
 *     <div className="App">
 *       <AppointmentBooking />
 *     </div>
 *   );
 * }
 *
 * export default App;
 */