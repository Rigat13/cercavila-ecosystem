import {useState} from "react";
import { useEventsContext} from "@/app/sections/events/EventsContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useEventForm(): {
    submitForm: ({ name, description, image, primaryColour, secondaryColour, price, type }:
                     { name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { createEvent } = useEventsContext();

    function submitForm({ name, description, image, primaryColour, secondaryColour, price, type }:
                            { name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) {
        setFormStatus(FormStatus.Loading);
        try {
            createEvent({id: "", name, description, image, primaryColour, secondaryColour, price, type })

                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    throw new Error("No s'ha pogut crear el producte digital. \nMotiu: "+e);
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