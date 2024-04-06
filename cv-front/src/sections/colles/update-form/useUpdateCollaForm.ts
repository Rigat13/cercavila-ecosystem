import {useState} from "react";
import {useCollesContext} from "@/sections/colles/CollesContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useUpdateCollaForm(): {
    formStatus: FormStatus;
    submitForm: (formData: { name: string, entity: string, foundationYear: number }) => void;
    resetFormStatus: () => void;
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { updateColla } = useCollesContext();

    function submitForm({ id, name, entity, foundationYear }: { name: string, entity: string, foundationYear: number }) {
        setFormStatus(FormStatus.Loading);
        try {
            updateColla({id, name, entity, foundationYear })
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