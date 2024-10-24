import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import './DatosLogin.css';

function LoginDatos() {
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
            const response = await fetch("http://localhost:8080/api/accounts/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: inputs.correo,
                    password: inputs.contrasenia,
                }),
            });

            if (!response.ok) {
                // Si el servidor devuelve un error (401, 400, etc.)
                alert("Credenciales incorrectas o problema en el servidor.");
                return;
            }

            // Verificar si la respuesta tiene cuerpo antes de convertirla a JSON
            const responseText = await response.text();
            if (!responseText) {
                alert("Cuenta no encontrada.");
                return;
            }

            const account = JSON.parse(responseText);  // Convertir el texto a JSON

            // Verificar si el account es null o undefined
            if (!account) {
                alert("Cuenta no encontrada.");
                return;
            }

            // Si el account no es null, redirigir según el tipo de cuenta
            sessionStorage.setItem("Login", account.email);

            if (account.accountType === "CLIENT") {
                sessionStorage.setItem('LoginCliente', inputs.correo);
                navigate("/ClienteIndex");
            } else if (account.accountType === "EMPLOYEE") {
                sessionStorage.setItem('LoginEmpleado', inputs.correo);
                navigate("/EmpleadoIndex");
            } else if (account.accountType === "ADMIN") {
                sessionStorage.setItem('LoginAdmin', inputs.correo);
                navigate("/AdminIndex");
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Ocurrió un error durante el login.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="FondoC2">
                <div className="FondoC21">
                    <body>
                    <h2 className="titlePage3" style={{marginLeft:0}}>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Bigshot+One&display=swap');

                        </style>
                        Inicio de sesi&oacute;n
                    </h2>
                    <div className="inputRegisterBox">
                        <style>
                            @import
                            url('https://fonts.googleapis.com/css2?family=Abel&family=Bigshot+One&display=swap');
                        </style>
                        <div className="boxL">
                            <div className="registerBox">
                                <label className="fullName">Correo electr&oacute;nico:</label>
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
                            <input type="submit" className="registerButton" value="Iniciar sesi&oacute;n"/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="/RegistroUsuario" className="haveAnAccount">Reg&iacute;strate aqu&iacute;</Link>
                        </div>
                    </div>
                    </body>
                </div>
            </div>
        </form>
    );
}

export {LoginDatos};