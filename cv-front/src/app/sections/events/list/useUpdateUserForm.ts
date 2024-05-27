import { useState } from "react";
import { useEventsContext } from "@/app/sections/events/EventsContext";

export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useUpdateUserForm(): {
    submitForm: ({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                     activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                     { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                         coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                         activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { updateUser } = useEventsContext();

    async function submitForm({
                                  id, nickname, name, firstSurname, secondSurname, email, password, roles,
                                  coins, digitalProducts, activeUserImage, activeUserImageFrame, activeUserBackgroundImage,
                                  activeUserTitle, activeUserBackgroundColour, activePins
                              }: {
        id: string, nickname: string; name: string; firstSurname: string; secondSurname: string;
        email: string; password: string; roles: string[]; coins: number; digitalProducts: string[];
        activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
        activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[];
    }) {

        setFormStatus(FormStatus.Loading); // Set form status to loading before making the request
        coins = coins ? coins : 0; // Ensure that coins are initialized properly

        try {
            await updateUser({
                id, nickname, name, firstSurname, secondSurname, email, password, roles, coins,
                digitalProducts, activeUserImage, activeUserImageFrame, activeUserBackgroundImage,
                activeUserTitle, activeUserBackgroundColour, activePins
            });
            setFormStatus(FormStatus.Success);
        } catch (error) {
            console.error('Error updating user data:', error);
            setFormStatus(FormStatus.Error);
        }
    }

    function resetFormStatus() { setFormStatus(FormStatus.Initial);}
    return {
        formStatus,
        submitForm,
        resetFormStatus,
    };
}
