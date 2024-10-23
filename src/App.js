import React, { useEffect } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import RegistroCuentaClientes from './RegistroCuentaClientes';
import ClienteIndex from './ClienteIndex';
import EmpleadoIndex from './EmpleadoIndex';
import AdminIndex from './AdminIndex';
import ProductForm from './components/RegisterProductView/ProductForm';
import { RegistroUsuario } from './pages/registerUser/RegistroUsuario';
import { InicioSesion } from './pages/login/InicioSesion';
import { RegisterEmployee } from './pages/registerUser/RegisterEmployee';
import AppointmentBooking from './components/Reservation/AppointmentBooking';
import './components/filtrarClientes/FliteredClient.css';
import FilteredClient from './components/filtrarClientes/FilteredClient';
import './components/Bases/TabNavigation.css';

const TabNavigation = () => {
    return (
        <nav className="tab-navigation">
            <ul className="tabs">
                <li>
                    <NavLink to="/">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/RegistroUsuario">Registrar Clientes</NavLink>
                </li>
                <li>
                    <NavLink to="/RegistroEmpleado">Registrar Empleados</NavLink>
                </li>
                <li>
                    <NavLink to="/ProductForm">Registrar Producto</NavLink>
                </li>
                <li>
                    <NavLink to="/RegistroCita">Registrar Cita</NavLink>
                </li>
                <li>
                    <NavLink to="/FiltrarCliente">Filtrar Clientes</NavLink>
                </li>
            </ul>
        </nav>
    );
};


const App = () => {
    useEffect(() => {
        // Inicialización del estado en sessionStorage si no existe
        if (sessionStorage.getItem('LoginCliente') === null) {
            sessionStorage.setItem('LoginCliente', "");
        }
        if (sessionStorage.getItem('LoginEmpleado') === null) {
            sessionStorage.setItem('LoginEmpleado', "");
        }
        if (sessionStorage.getItem('LoginAdmin') === null) {
            sessionStorage.setItem('LoginAdmin', "");
        }
    }, []);

    return (
        <div className="App">
            {/* Componente de navegación por pestañas */}
            <TabNavigation />

            {/* Definición de las rutas de la aplicación */}
            <Routes>
                <Route path="/" element={<InicioSesion />} />
                <Route path="/RegistroCuentaClientes" element={<RegistroCuentaClientes />} />
                <Route path="/RegistroUsuario" element={<RegistroUsuario />} />
                <Route path="/ClienteIndex" element={<ClienteIndex />} />
                <Route path="/EmpleadoIndex" element={<EmpleadoIndex />} />
                <Route path="/AdminIndex" element={<AdminIndex />} />
                <Route path="/RegistroEmpleado" element={<RegisterEmployee />} />
                <Route path="/RegistroCita" element={<AppointmentBooking />} />
                <Route path="/FiltrarCliente" element={<FilteredClient />} />
                <Route path="/ProductForm" element={<ProductForm />} />
                {/* Ruta para manejar páginas no encontradas */}
                <Route path="*" element={<h2>Página no encontrada</h2>} />
            </Routes>
        </div>
    );
};

export default App;
