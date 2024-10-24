import React, { useState } from 'react';
import './EliminarEmpleado.css';

function EliminarEmpleado() {
    // Estado para la búsqueda y lista de empleados
    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', phone: '456-789-1234' },
        // Agrega más empleados según sea necesario
    ]);

    // Filtrar empleados basado en el término de búsqueda
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    // Eliminar un empleado de la lista visualmente
    const handleDelete = (id) => {
        const updatedClients = clients.filter(client => client.id !== id);
        setClients(updatedClients);
    };

    return (
        <div className="mainContainer">
            <div className="contentWrapper">
                <div className="inputSearchBox">
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="tableContainer">
                    {filteredClients.length > 0 ? (
                        <table className="clientTable">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredClients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                        <button
                                            className="deleteButton"
                                            onClick={() => handleDelete(client.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="noResults">Empleado no encontrado.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EliminarEmpleado;