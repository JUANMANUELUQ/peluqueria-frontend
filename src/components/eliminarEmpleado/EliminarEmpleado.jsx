import React, {useEffect, useState} from 'react';
import './EliminarEmpleado.css';

function EliminarEmpleado() {
    // Estado para la búsqueda y lista de empleados
    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFilteredClients = async (search) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/accounts/filterEmployee', {
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

    useEffect(() => {
        fetchFilteredClients(searchTerm);
    }, [searchTerm]);

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
                            {clients.map((client) => (
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