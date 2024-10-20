
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
import AppointmentBooking from "./components/Reservation/AppointmentBooking";

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
        if (sessionStorage.getItem('LoginAdmin') === null) {
            sessionStorage.setItem('LoginAdmin', "");
            sessionStorage.setItem('LoginAdmin', "");
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
          <Route path="/RegistroCita" element={<AppointmentBooking />} />
          <Route path="/ProductForm" element={<ProductForm />} /> {/* Nueva ruta para ProductForm */}
      </Routes>
  );
};

/**
  import React from 'react';
  import './App.css'; // Importa tus estilos globales
  import AppointmentBooking from './components/Reservation/AppointmentBooking'; // Ajusta la ruta según tu estructura de proyecto

  function App() {
    return (
      <div className="App">
        <AppointmentBooking />
      </div>
    );
  }

  export default App;
**/


export default App;
