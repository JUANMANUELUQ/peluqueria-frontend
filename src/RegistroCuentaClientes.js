import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./formulario.css";

const RegistroCuentaClientes = () => {
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
            const responseExist = await fetch("http://localhost:8080/api/RegistroCuentaCliente/exist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: inputs.nombre,
                    email: inputs.correo,
                }),
            });

            const exists = await responseExist.json();

            if (exists) {
                alert("Ya existe una cuenta con ese correo o nombre");
            } else {
                // Si no existe, crear la nueva cuenta
                const responseCreate = await fetch("http://localhost:8080/api/RegistroCuentaCliente/create", {
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

    const divLoginStyle = {
        margin:"auto",
        marginTop:"10%",
        color: "white",
        backgroundColor: "DodgerBlue",
        fontFamily: "Sans-Serif",
        padding:"30px",
        borderRadius:"10px",
        width:"200px"
    };

    const subDivLogin = {
        marginTop:"20px"
    };

    return(
        <>
            <div style={divLoginStyle}>
                <form onSubmit={handleSubmit}>
                    <div style={subDivLogin}>
                        Nombre:<br/>
                        <input type="text" name="nombre" value={inputs.nombre} onChange={handleChange}/>
                    </div>
                    <div style={subDivLogin}>
                        Correo:<br/>
                        <input type="text" name="correo" value={inputs.correo} onChange={handleChange}/>
                    </div>
                    <div style={subDivLogin}>
                        Contrase&ntilde;a:<br/>
                        <input type="password" name="contrasenia" value={inputs.contrasenia} onChange={handleChange}/>
                    </div>
                    <div style={subDivLogin}>
                        <input type="submit" value="Registrarse"/>
                    </div>
                    <div style={subDivLogin}>
                        <Link to="/">Ya tienes cuenta</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegistroCuentaClientes;