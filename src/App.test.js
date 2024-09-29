import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import RegistroCuentaClientes from './RegistroCuentaClientes';  // Asegúrate de tener este componente

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/RegistroCuentaClientes" element={<RegistroCuentaClientes />} />
      </Routes>
  );
};

export default App;