import {useState} from "react";
import { useUsersContext} from "@/app/sections/users/UsersContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useUserForm(): {
    submitForm: ({nickname, email, password }:
                     { nickname: string; email: string; password: string; })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { createUser } = useUsersContext();

    function submitForm({ nickname, email, password,  }:
                            { nickname: string; email: string; password: string; }) {
        setFormStatus(FormStatus.Loading);
        try {

            createUser({id: "", nickname, name: "", firstSurname: "", secondSurname: "", email, password, roles: [], coins: 0, digitalProducts: [], activeUserImage: "",
                activeUserImageFrame: "", activeUserBackgroundImage: "", activeUserTitle: "", activeUserBackgroundColour: "", activePins: []})

                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    console.log("No s'ha pogut crear l'usuari. \nMotiu: "+e);
                    setFormStatus(FormStatus.Error);
                });
        } catch (e) {
            setFormStatus(FormStatus.Error);
        }
    }

    function resetFormStatus() {
        setFormStatus(FormStatus.Initial);
    }

    return {
        formStatus,
        submitForm,
        resetFormStatus,
    };
}