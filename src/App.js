import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import RegistroCuentaClientes from './RegistroCuentaClientes';
import ClienteIndex from "./ClienteIndex";
import EmpleadoIndex from "./EmpleadoIndex";  // Asegúrate de tener este componente

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/RegistroCuentaClientes" element={<RegistroCuentaClientes />} />
          <Route path="/ClienteIndex" element={<ClienteIndex />} />
          <Route path="/EmpleadoIndex" element={<EmpleadoIndex />} />
      </Routes>
  );
};

export default App;
