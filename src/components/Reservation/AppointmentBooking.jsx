import React, { useState, useEffect } from 'react';
import './AppointmentBooking.css';
import {useNavigate} from "react-router-dom";

function AppointmentBooking() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [employeeDni, setEmployeeDni] = useState('');
    const [clientId, setClientId] = useState('');
    const [searchDni, setSearchDni] = useState('');
    const [price, setPrice] = useState(0);
    const [appointments, setAppointments] = useState([]); // Estado para las citas filtradas
    const services = ['Corte de cabello', 'Tinte', 'Manicure', 'Pedicure', 'Tratamiento capilar'];
    const loginCliente = sessionStorage.getItem('LoginCliente');
    const navigate = useNavigate();

    useEffect(() => {
        if (loginCliente == "") {
            navigate("/");  // Redirige a la página raíz si no se ha iniciado sesión
        }
    }, [loginCliente, navigate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
        if (event.target.value === 'Corte de cabello') {
            setPrice(50000);
        } else if (event.target.value === 'Tinte') {
            setPrice(80000);
        } else if (event.target.value === 'Manicure'){
            setPrice(30000)
        } else if (event.target.value === 'Pedicure'){
            setPrice(35000)
        } else if (event.target.value === 'Tratamiento capilar'){
            setPrice(100000)
        }
    };

    const handleEmployeeDniChange = (event) => {
        setEmployeeDni(event.target.value);
    };

    const handleClientIdChange = (event) => {
        setClientId(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedDate || !selectedService || !employeeDni || !clientId) {
            alert('Por favor completa todos los campos');
            return;
        }

        const appointmentData = {
            date: new Date(selectedDate).toISOString(),
            price: price,
            service: selectedService,
            idClient: clientId,
            idWorker: employeeDni
        };

        try {
            const response = await fetch('http://localhost:8080/api/appointment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                const message = await response.text();
                alert(`Cita creada exitosamente: ${message}`);
            } else {
                alert('Hubo un error al crear la cita');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error de conexión con el servidor');
        }
    };

    // Función para buscar citas por DNI
    const handleSearch = () => {
        // Simulación de búsqueda. Aquí deberías reemplazar con una llamada al backend para obtener las citas según el DNI.
        const mockAppointments = [
            { id: 1, date: '2024-11-10', service: 'Corte de cabello', price: 50000, clientId: '123', employeeDni: '456' },
            { id: 2, date: '2024-11-15', service: 'Tinte', price: 80000, clientId: '123', employeeDni: '789' }
        ];

        const filteredAppointments = mockAppointments.filter(app => app.clientId.includes(searchDni));
        setAppointments(filteredAppointments);
    };

    const handleSearchDniChange = (event) => setSearchDni(event.target.value);
    // Función para seleccionar una cita y rellenar los campos
    const handleSelectAppointment = (appointment) => {
        setSelectedDate(appointment.date);
        setSelectedService(appointment.service);
        setEmployeeDni(appointment.employeeDni);
        setClientId(appointment.clientId);
        setPrice(appointment.price);
    };
    return (
        <div className="backL">
            <div className="BackgroundB2">
                <div className="BackgroundB21">
                    <h2 className="titlePage3">Separación de Citas</h2>

                    <div className="inputRegisterBox">
                        <div className="boxL">
                            <div className="registerBox">
                                <label className="label">DNI del Cliente</label>
                                <input
                                    type="text"
                                    value={clientId}
                                    onChange={handleClientIdChange}
                                    placeholder="Ingrese el DNI del cliente"
                                />
                            </div>
                            <div className="registerBox">
                                <label className="label">Fecha</label>
                                <input type="date" value={selectedDate} onChange={handleDateChange} />
                            </div>
                            <div className="registerBox">
                                <label className="label">Precio</label>
                                <input type="text" value={`$${price.toLocaleString()}`} disabled />
                            </div>
                        </div>
                        <div className="boxR">
                            <div className="registerBox">
                                <label className="label">DNI del Empleado</label>
                                <input
                                    type="text"
                                    value={employeeDni}
                                    onChange={handleEmployeeDniChange}
                                    placeholder="Ingrese el DNI del empleado"
                                />
                            </div>
                            <div className="registerBox">
                                <label className="label">Servicio</label>
                                <select value={selectedService} onChange={handleServiceChange}>
                                    <option value="">Seleccione un servicio</option>
                                    {services.map((service, index) => (
                                        <option key={index} value={service}>
                                            {service}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="registerButton" onClick={handleSubmit}>Reservar Cita</button>

                    {/* Barra de búsqueda y tabla de resultados */}
                    <div className="searchBox">
                        <input
                            type="text"
                            value={searchDni}
                            onChange={handleSearchDniChange}
                            placeholder="Buscar por DNI del Cliente"
                            className="searchInput"
                        />
                        <button onClick={handleSearch} className="searchButton">Buscar</button>
                    </div>

                    <div className="tableContainer">
                        {appointments.length > 0 ? (
                            <table className="clientTable">
                                <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Servicio</th>
                                    <th>Precio</th>
                                    <th>DNI Empleado</th>
                                </tr>
                                </thead>
                                <tbody>
                                {appointments.map((appointment) => (
                                    <tr
                                        key={appointment.id}
                                        onClick={() => handleSelectAppointment(appointment)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{appointment.date}</td>
                                        <td>{appointment.service}</td>
                                        <td>{`$${appointment.price.toLocaleString()}`}</td>
                                        <td>{appointment.employeeDni}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="noResults">No se encontraron citas.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AppointmentBooking;
