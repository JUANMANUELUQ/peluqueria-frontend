import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./formulario.css";

const Login = () => {
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
            alert(inputs.correo+"+"+inputs.contrasenia);
            const response = await fetch("http://localhost:8080/api/account/login", {
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
            } else if (account.accountType === "WORKER") {
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

    return (
        <>
            <div style={divLoginStyle}>
                <form onSubmit={handleSubmit}>
                    <div style={subDivLogin}>
                        Correo electr&oacute;nico:<br/>
                        <input type="email" name="correo" required="required"
                               value={inputs.correo} onChange={handleChange}/>
                    </div>
                    <div style={subDivLogin}>
                        Contrase&ntilde;a:<br/>
                        <input type="password" name="contrasenia" required="required"
                               value={inputs.contrasenia} onChange={handleChange}/>
                    </div>
                    <div style={subDivLogin}>
                        <input type="submit" value="Iniciar sesi&oacute;n"/>
                    </div>
                    <div style={subDivLogin}>
                        <Link to="/RegistroUsuario">Reg&iacute;strate aqu&iacute;</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;