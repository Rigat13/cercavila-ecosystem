import {useState} from "react";
import { useUsersContext} from "@/app/sections/users/UsersContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useUserForm(): {
    submitForm: ({nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                     activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                     { nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                         coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                         activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { createUser } = useUsersContext();

    function submitForm({ nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                            activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                            { nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                                coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                                activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) {
        setFormStatus(FormStatus.Loading);
        try {
            createUser({id: "", nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins})

                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    throw new Error("No s'ha pogut crear l'usuari. \nMotiu: "+e);
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