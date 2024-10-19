import {BaseLog} from "../../components/BaseLog";
import {DataRegisterEmployee} from "../../components/RegisterUserView/DataRegisterEmployee";

function RegisterEmployee() {
    return (
        <BaseLog
            PAGETITLE="Registro Empleado"
            PAGEDESCRIPTION="Bienvenido a nuestra organizacción"
            PAGEDESCRIPTION2="Ingrese los datos del nuevo empleado"
            COMPONENT={DataRegisterEmployee}
        />

    );
}

export {RegisterEmployee};