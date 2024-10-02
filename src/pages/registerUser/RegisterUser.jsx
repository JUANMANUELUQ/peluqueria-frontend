import {BaseLog} from "../../components/BaseLog";
import {DataRegisterUser} from "../../components/RegisterUserView/DataRegisterUser";

function RegisterUser() {
    return (
        <BaseLog
            PAGETITLE="Register"
            PAGEDESCRIPTION="The best service for you"
            PAGEDESCRIPTION2="here"
            COMPONENT={DataRegisterUser}
        />

    );
}

export {RegisterUser};