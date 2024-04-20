import {useState} from "react";
import {useCollesContext} from "@/app/sections/colles/CollesContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useUpdateCollaForm(): {
    submitForm: ({id, name, entity, foundationYear, description, type, neighbourhood, logo}:
                     { id: string; name: string; entity: string; foundationYear: number; description: string, type: string; neighbourhood: string; logo: File | null })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { updateColla } = useCollesContext();

    function submitForm({ id, name, entity, foundationYear, description, type, neighbourhood, logo }:
                            { id: string, name: string, entity: string, foundationYear: number, description: string, type: string; neighbourhood: string; logo: File | null }) {
        setFormStatus(FormStatus.Loading);
        try {
            updateColla({id, name, entity, foundationYear, description, type, neighbourhood, logo })
                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    throw new Error("No s'ha pogut editar la colla. \nMotiu: "+e);
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