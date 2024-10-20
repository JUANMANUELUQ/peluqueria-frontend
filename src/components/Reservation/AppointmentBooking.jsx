import React, { useState, useEffect } from 'react';
import './AppointmentBooking.css';

function AppointmentBooking() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [employeeDni, setEmployeeDni] = useState(''); // Campo para el DNI del empleado
    const [clientId, setClientId] = useState(''); // Campo para el ID del cliente
    const [price, setPrice] = useState(0);

    const services = ['Corte de cabello', 'Tinte', 'Manicure', 'Pedicure', 'Tratamiento capilar'];

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

    return (
        <div className="backL">
            <div className="BackgroundB2">
                <div className="BackgroundB21">
                    <h2 className="titlePage3">Separación de Citas</h2>
                    <div className="inputRegisterBox">
                        <div className="boxL">
                            <div className="registerBox">
                                <label className="label">DNI del Cliente</label>
                                <input type="text" value={clientId} onChange={handleClientIdChange}
                                       placeholder="Ingrese el DNI del cliente"/>
                            </div>
                            <div className="registerBox">
                                <label className="label">Fecha</label>
                                <input type="date" value={selectedDate} onChange={handleDateChange}/>
                            </div>
                            <div className="registerBox">
                                <label className="label">Precio</label>
                                <input type="text" value={`$${price.toLocaleString()}`} disabled/>
                            </div>
                        </div>
                        <div className="boxR">
                            <div className="registerBox">
                                <label className="label">DNI del Empleado</label>
                                <input type="text" value={employeeDni} onChange={handleEmployeeDniChange}
                                       placeholder="Ingrese el DNI del empleado"/>
                            </div>
                            <div className="registerBox">
                                <label className="label">Servicio</label>
                                <select value={selectedService} onChange={handleServiceChange}>
                                    <option value="">Seleccione un servicio</option>
                                    {services.map((service, index) => (
                                        <option key={index} value={service}>{service}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="registerButton" onClick={handleSubmit}>Reservar Cita</button>
                </div>
            </div>
        </div>
    );
}

export default AppointmentBooking;
