import React, { useState, useEffect } from 'react';
import './FliteredClient.css';

function FilteredClient() {
    // Estados para la búsqueda, lista de clientes, estado de carga y posibles errores
    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para obtener clientes filtrados o todos si no hay búsqueda
    const fetchFilteredClients = async (search = '') => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/accounts/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Esto mostrará la respuesta en la consola

            // Accede a 'reply' para obtener la lista de clientes
            if (data && data.reply) {
                setClients(data.reply); // Ahora configuramos clients con data.reply
            } else {
                setClients([]); // Vacía la lista si no hay resultados
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
            setError(`Error fetching clients: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para realizar la búsqueda cada vez que el término de búsqueda cambie
    useEffect(() => {
        fetchFilteredClients(searchTerm);
    }, [searchTerm]);

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
                    {loading ? (
                        <div className="loading">Loading clients...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : clients.length > 0 ? (
                        <table className="clientTable">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map((client, index) => (
                                <tr key={index}>
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
