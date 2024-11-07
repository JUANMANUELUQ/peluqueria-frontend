import React, { useState, useEffect } from 'react';
import './CancelarCitas.css';
import {useNavigate} from "react-router-dom";

function CancelarCita() {
    // Estado para la búsqueda y lista de citas
    const [searchTerm, setSearchTerm] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const loginCliente = sessionStorage.getItem('LoginCliente');
    const navigate = useNavigate();

    // useEffect para cargar las citas desde el backend
    useEffect(() => {
        if (loginCliente === "") {
            navigate("/");  // Redirige a la página raíz si no se ha iniciado sesión
        }
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/api/appointment/list');
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data)
                setAppointments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Finalizar el estado de carga
            }
        };

        fetchAppointments();
    }, [loginCliente, navigate]);


    // Filtrar citas basado en el término de búsqueda (ID de la cita)
    const filteredAppointments = appointments.filter(appointment =>
        appointment.id.includes(searchTerm)
    );

    // Función para eliminar una cita
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la cita con ID ${id}?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/appointment/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Cita con ID ${id} eliminada exitosamente.`);
                // Actualizar el estado eliminando la cita del array
                setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
            } else {
                console.error(`Error al eliminar la cita con ID ${id}.`);
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
        }
    };

    // Mostrar mensaje de carga o error
    if (loading) return <div>Cargando citas...</div>;
    if (error) return <div>Error: {error}</div>;

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
                                    <td>{appointment.employee ? appointment.employee.name : 'Sin asignar'}</td>
                                    <td>{appointment.price}</td>
                                    <td>
                                        <button
                                            className="deleteButton"
                                            onClick={() => handleDelete(appointment.id)}
                                        >
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
