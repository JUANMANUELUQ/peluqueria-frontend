import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import './DatosLogin.css';

function LoginDatos() {
    const [fullName, setFullName] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleSubmit() {
        //Aquí  agregar la lógica para registrar un usuario
        console.log('User registered successfully');
        alert("User registration was successful");
    }


    return (
        <div className="FondoC2">
            <div className="FondoC21">
                <body>
                <h2 className="titlePage3">
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
                                type="text"
                                required="required"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="registerBox">
                            <label className="password">Contrase&ntilde;a:</label>
                            <input
                                type="text"
                                required="required"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
    );
}

export {LoginDatos};