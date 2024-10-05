import {BaseLog} from "../../components/BaseLog";
import {DataRegisterUser} from "../../components/RegisterUserView/DataRegisterUser";

function RegisterUser() {
    return (
        <BaseLog
            PAGETITLE="Registro"
            PAGEDESCRIPTION="Transformamos tu estilo,"
            PAGEDESCRIPTION2="realzamos tu belleza"
            COMPONENT={DataRegisterUser}
        />

    );
}

export {RegisterUser};