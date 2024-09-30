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

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));
        if (inputs.correo=="1") {
            sessionStorage.setItem('LoginCliente', inputs.correo);
            alert("Login: "+sessionStorage.getItem('LoginCliente'));
            navigate("/ClienteIndex");
        }
        if (inputs.correo=="2") {
            sessionStorage.setItem('LoginEmpleado', inputs.correo);
            navigate("/EmpleadoIndex");
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

    return (
        <>
            <div style={divLoginStyle}>
                <form onSubmit={handleSubmit}>
                    <div style={subDivLogin}>
                        Nombre:<br/>
                        <input type="text" name="correo" value={inputs.correo} onChange={handleChange}/>
                    </div>
                    <div style={subDivLogin}>
                        Contrase&ntilde;a:<br/>
                        <input type="password" name="contrasenia" value={inputs.contrasenia} onChange={handleChange}/>
                    </div>
                    <div style={subDivLogin}>
                        <input type="submit" value="Iniciar sesi&oacute;n"/>
                    </div>
                    <div style={subDivLogin}>
                        <Link to="/RegistroCuentaClientes">Reg&iacute;strate aqu&iacute;</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;