import React, {useState} from 'react';
import './DatosUsuario.css';
import {Link, useNavigate} from "react-router-dom";

function RegistroUsuarioDatos() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Verificar si el cliente ya existe
            const responseExist = await fetch("http://localhost:8080/api/accounts/exist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: inputs.correo }), // Enviar como objeto
            });

            const exists = await responseExist.json();

            if (exists) {
                alert("Ya existe una cuenta con ese correo");
            } else {
                // Si no existe, crear la nueva cuenta
                const responseCreate = await fetch("http://localhost:8080/api/accounts/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: inputs.nombre,
                        email: inputs.correo,
                        password: inputs.contrasenia,
                    }),
                });

                if (responseCreate.ok) {
                    alert("Cuenta creada con exito.");
                    navigate("/"); // Redirigir al login o a otra página
                } else {
                    alert("Error al crear la cuenta.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrio un error.");
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="FondoB2">
                <div className="FondoB21">
                    <body>
                    <h2 className="titlePage3" style={{marginLeft:0}}>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Bigshot+One&display=swap');
                        </style>
                        Crear cuenta
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
                                    type="email"
                                    required="required"
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
                            <input type="submit" className="registerButton" value="Registrarse"/>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="/" className="haveAnAccount">&iquest;Ya tienes cuenta?</Link>
                        </div>

                    </div>
                    </body>

                </div>
            </div>
        </form>
    );
}

export {RegistroUsuarioDatos};