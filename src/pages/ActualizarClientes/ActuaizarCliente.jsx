import {BaseLog} from "../../components/BaseLog";
import {ActualizacionClientesDatos} from "../../components/ActualizarClientes/ActualizacionClientesDatos";

function ActualizarCliente() {
    return (
        <BaseLog
            PAGETITLE="Actualizar cuenta"
            PAGEDESCRIPTION="Cambia los datos"
            PAGEDESCRIPTION2="que desea actualizar"
            COMPONENT={ActualizacionClientesDatos}
        />

    );
}

export {ActualizarCliente};