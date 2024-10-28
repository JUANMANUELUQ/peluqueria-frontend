import React, {useEffect, useState} from 'react';
import './DatosActualizarCliente.css';
import {Link, useNavigate} from "react-router-dom";

function ActualizacionClientesDatos() {
    const loginCliente = sessionStorage.getItem('LoginCliente');
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si el usuario ha iniciado sesión
        if (loginCliente === "") {
            navigate("/");  // Redirige a la página raíz si no se ha iniciado sesión
        } else {
            // Función asincrónica para obtener la información de la cuenta
            const obtenerInfoCuenta = async () => {
                try {
                    // Realiza la solicitud POST enviando el email
                    const response = await fetch("http://localhost:8080/api/accounts/getInfoAccount", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: loginCliente }), // Envía el email capturado del input
                    });

                    // Verifica si la solicitud fue exitosa
                    if (!response.ok) {
                        throw new Error("Error al obtener la información de la cuenta");
                    }

                    // Procesa los datos de la respuesta
                    const data = await response.json();
                    setInputs({
                        nombre: data.name,
                        correo: data.email,
                        telefono: data.phone,
                        contrasenia: data.password,
                        cedula: data.dni,
                        direccion: data.address
                    });

                } catch (error) {
                    console.error(error);
                }
            };

            obtenerInfoCuenta();
        }
    }, [loginCliente, navigate]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
                // Si no existe, crear la nueva cuenta
                const responseCreate = await fetch("http://localhost:8080/api/accounts/updateClient", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: inputs.nombre,
                        email: inputs.correo,
                        phone: inputs.telefono,
                        password: inputs.contrasenia,
                        dni: inputs.cedula,
                        address: inputs.direccion
                    }),
                });

                if (responseCreate.ok) {
                    alert("Cuenta actualizada con exito.");
                    navigate("/ClienteIndex");
                } else {
                    alert("Error al actualizar la cuenta.");
                }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrio un error.");
        }
    }

    const myStyle = {
        marginTop:"-60px",
        marginLeft:0
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="FondoB2">
                <div className="FondoB22">
                    <h2 className="titlePage3" style={myStyle}>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Bigshot+One&display=swap');
                        </style>
                        Actualizar cuenta
                    </h2>
                    <div className="inputRegisterBox">
                        <style>
                            @import
                            url('https://fonts.googleapis.com/css2?family=Abel&family=Bigshot+One&display=swap');
                        </style>
                        <div className="boxL">
                            <div className="registerBox">
                                <label className="fullName">Nombre:</label>
                                <input
                                    type="text"
                                    required="required"
                                    name="nombre"
                                    value={inputs.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="registerBox">
                                <label className="address">Correo electr&oacute;nico:</label>
                                <input
                                    style={{backgroundColor:"lightgray"}}
                                    type="email"
                                    required="required"
                                    readOnly="readonly"
                                    name="correo"
                                    value={inputs.correo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="registerBox">
                                <label className="password">Contrase&ntilde;a:</label>
                                <input
                                    type="password"
                                    required="required"
                                    name="contrasenia"
                                    value={inputs.contrasenia}
                                    onChange={handleChange}
                                />
                            </div>
                            <input type="submit" className="registerButton" value="Actualizar datos"/>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="/ClienteIndex" className="haveAnAccount">Volver</Link>
                        </div>
                        <div className="boxR">
                            <div className="registerBox">
                                <label className="fullName">Cedula:</label>
                                <input
                                    style={{backgroundColor:"lightgray"}}
                                    type="text"
                                    required="required"
                                    readOnly="readonly"
                                    name="cedula"
                                    value={inputs.cedula}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="registerBox">
                                <label className="phone">Telefono:</label>
                                <input
                                    type="tel"
                                    required="required"
                                    name="telefono"
                                    value={inputs.telefono}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="registerBox">
                                <label className="phone">Direcci&oacute;n:</label>
                                <input
                                    type="text"
                                    required="required"
                                    name="direccion"
                                    value={inputs.direccion}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export {ActualizacionClientesDatos};