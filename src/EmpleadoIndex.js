import { Link, useNavigate } from "react-router-dom";
import {useEffect} from "react";

const ClienteIndex = () => {
    const loginEmpleado = sessionStorage.getItem('LoginEmpleado');
    const navigate = useNavigate();

    useEffect(() => {
        if (loginEmpleado === "") {
            navigate("/");  // Redirige a la página raíz si no se ha iniciado sesión
        }
    }, [loginEmpleado, navigate]);

    const handleLogout = () => {
        sessionStorage.setItem('LoginEmpleado', "");
        navigate("/");  // Redirige al usuario a la página de inicio
    };

    return (
        <>
            Empleado({loginEmpleado})<br/>
            <Link to="/" onClick={handleLogout}>Cerrar sesi&oacute;n</Link>
        </>
    );
}

export default ClienteIndex;