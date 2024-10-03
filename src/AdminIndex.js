import { Link, useNavigate } from "react-router-dom";
import {useEffect} from "react";

const AdminIndex = () => {
    const loginCliente = sessionStorage.getItem('LoginAdmin');
    const navigate = useNavigate();

    useEffect(() => {
        if (loginCliente == "") {
            navigate("/");  // Redirige a la página raíz si no se ha iniciado sesión
        }
    }, [loginCliente, navigate]);

    const handleLogout = () => {
        sessionStorage.setItem('LoginAdmin', "");
        navigate("/");  // Redirige al usuario a la página de inicio
    };

    return (
        <>
            Administrador({loginCliente})<br/>
            <Link to="/" onClick={handleLogout}>Cerrar sesi&oacute;n</Link>
        </>
    );
}

export default AdminIndex;