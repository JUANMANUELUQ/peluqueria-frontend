import React, {useState} from 'react';
import './EmployeeData.css';

function DataRegisterEmployee() {
    const [fullName, setFullName] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        // Validación de los datos del formulario antes de enviar
        if (!fullName || !id || !address || !phoneNumber || !email || !password) {
            alert("Todos los campos son obligatorios");
            return;
        }

        // Crear el objeto que se enviará al backend
        const accountData = {
            name: fullName,
            dni: id,
            address: address,
            phone: phoneNumber,
            password: password,
            email: email,
            accountType: "EMPLOYEE"
        };

        try {
            // Hacer la petición POST al backend
            const response = await fetch('http://localhost:8080/api/accounts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountData),
            });

            if (response.ok) {
                const message = await response.text();
                alert(message); // Mostrar mensaje de éxito
            } else {
                alert("Error al registrar el empleado");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Hubo un error al registrar el empleado");
        }
    }

    return (
        <div className="BackgroundB2">
            <div className="BackgroundB21">
                <h2 className="titlePage3">
                    Crear cuenta de empleado
                </h2>
                <div className="inputRegisterBox">
                    <div className="boxL">
                        <div className="registerBox">
                            <label className="fullName">Nombre completo:</label>
                            <input
                                type="text"
                                required="required"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="registerBox">
                            <label className="address">Dirección:</label>
                            <input
                                type="text"
                                required="required"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="registerBox">
                            <label className="password">Contraseña:</label>
                            <input
                                type="password" // Cambiar a tipo "password"
                                required="required"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="registerButton" onClick={handleSubmit}>
                            Registrar
                        </button>
                    </div>
                    <div className="boxR">
                        <div className="registerBox">
                            <label className="id">Id:</label>
                            <input
                                type="text"
                                required="required"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="registerBox">
                            <label className="number">Número de teléfono:</label>
                            <input
                                type="text"
                                required="required"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="registerBox">
                            <label className="email">Email:</label>
                            <input
                                type="text"
                                required="required"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DataRegisterEmployee };
