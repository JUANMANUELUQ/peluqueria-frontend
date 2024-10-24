

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
import './components/cancelarCita/CancelarCitas.css'
import CancelarCita from './components/cancelarCita/CancelarCita'; // Ajusta la ruta según tu estructura de proyecto

function App() {
  return (
      <div className="App">
        <CancelarCita />
      </div>
  );
}

export default App;
