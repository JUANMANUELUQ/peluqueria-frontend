import React, { useState } from 'react';
import './FliteredClient.css';

function FilteredClient() {
    // Estado para la búsqueda y lista de clientes
    const [searchTerm, setSearchTerm] = useState('');
    const [clients] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', phone: '456-789-1234' },
        // Agrega más clientes según sea necesario
    ]);

    // Filtrar clientes basado en el término de búsqueda
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );
    return (
        <div className="mainContainer">
            <div className="contentWrapper">
                <div className="inputSearchBox">
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Search clients..."
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
                            </tr>
                            </thead>
                            <tbody>
                            {filteredClients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="noResults">No clients found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FilteredClient;