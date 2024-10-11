import React, { useState } from 'react';
import './AppointmentBooking.css';

function AppointmentBooking() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const services = ['Corte de cabello', 'Tinte', 'Manicure', 'Pedicure', 'Tratamiento capilar'];
    const employees = ['Juan', 'María', 'Carlos', 'Ana'];

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    return (
        <div className="backL">
            <div className="BackgroundB2">
                <div className="BackgroundB21">
                    <h2 className="titlePage3">Separación de Citas</h2>
                    <div className="inputRegisterBox">
                        <div className="boxL">
                            <div className="registerBox">
                                <label className="label">Fecha</label>
                                <input type="date" value={selectedDate} onChange={handleDateChange} />
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
                        <div className="boxR">
                            <div className="registerBox">
                                <label className="label">Empleado</label>
                                <select value={selectedEmployee} onChange={handleEmployeeChange}>
                                    <option value="">Seleccione un empleado</option>
                                    {employees.map((employee, index) => (
                                        <option key={index} value={employee}>{employee}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="registerBox">
                                <label className="label">Precio</label>
                                <input type="text" value="$50,000" disabled />
                            </div>
                        </div>
                    </div>
                    <button className="registerButton">Reservar Cita</button>
                </div>
            </div>
        </div>
    );
}

export default AppointmentBooking;