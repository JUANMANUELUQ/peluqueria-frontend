

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
import React from 'react';
import './App.css'; // Importa tus estilos globales
import './components/filtrarClientes/FliteredClient.css'
import FilteredClient from './components/filtrarClientes/FilteredClient'; // Ajusta la ruta según tu estructura de proyecto

function App() {
  return (
      <div className="App">
        <FilteredClient />
      </div>
  );
}

export default App;
