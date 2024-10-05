import {BaseLog} from "../../components/BaseLog";
import {RegistroUsuarioDatos} from "../../components/RegisterUserView/RegistroUsuarioDatos";

function RegistroUsuario() {
    return (
        <BaseLog
            PAGETITLE="Registro"
            PAGEDESCRIPTION="Transformamos tu estilo,"
            PAGEDESCRIPTION2="realzamos tu belleza"
            COMPONENT={RegistroUsuarioDatos}
        />

    );
}

export {RegistroUsuario};