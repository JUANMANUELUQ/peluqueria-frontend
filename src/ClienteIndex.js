import { Link, useNavigate } from "react-router-dom";
import {useEffect} from "react";

const ClienteIndex = () => {
    const loginCliente = sessionStorage.getItem('LoginCliente');
    const navigate = useNavigate();

    useEffect(() => {
        if (loginCliente === "false") {
            navigate("/");  // Redirige a la página raíz si no se ha iniciado sesión
        }
    }, [loginCliente, navigate]);

    const handleLogout = () => {
        sessionStorage.setItem('LoginCliente', "false");
        navigate("/");  // Redirige al usuario a la página de inicio
    };

    return (
        <>
            Cliente<br/>
            <Link to="/" onClick={handleLogout}>Cerrar sesi&oacute;n</Link>
        </>
    );
}

export default ClienteIndex;