import React, { useState } from 'react';
import './CancelarCitas.css';

function CancelarCita() {
    // Estado para la búsqueda y lista de citas
    const [searchTerm, setSearchTerm] = useState('');
    const [appointments] = useState([
        { id: 1, date: '2024-10-02', service: 'Corte de cabello', employee: 'Juan', price: '$50,000' },
        { id: 2, date: '2024-10-03', service: 'Tinte', employee: 'María', price: '$70,000' },
        { id: 3, date: '2024-10-04', service: 'Manicure', employee: 'Carlos', price: '$30,000' },
        // Agrega más citas según sea necesario
    ]);

    // Filtrar citas basado en el término de búsqueda (ID de la cita)
    const filteredAppointments = appointments.filter(appointment =>
        appointment.id.toString().includes(searchTerm)
    );

    // Función para eliminar una cita
    const handleDelete = (id) => {
        console.log(`Cita con ID ${id} eliminada.`); // Lógica de eliminación del backend irá aquí
        // Actualizar el estado de citas cuando se implemente la lógica de eliminación
    };

    return (
        <div className="mainContainer">
            <div className="contentWrapper">
                <div className="inputSearchBox">
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Buscar cita por ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="tableContainer">
                    {filteredAppointments.length > 0 ? (
                        <table className="appointmentTable">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Servicio</th>
                                <th>Empleado</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.service}</td>
                                    <td>{appointment.employee}</td>
                                    <td>{appointment.price}</td>
                                    <td>
                                        <button
                                            className="deleteButton"
                                            onClick={() => handleDelete(appointment.id)}>
                                            Cancelar cita
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="noResults">Cita no encontrada.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CancelarCita;