import { useState } from "react";
import { Link } from "react-router-dom";
import "./formulario.css";

const RegistroCuentaClientes = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));
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