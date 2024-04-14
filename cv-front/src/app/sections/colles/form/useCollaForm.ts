import {useState} from "react";
import { useCollesContext} from "@/app/sections/colles/CollesContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useCollaForm(): {
    submitForm: ({
                     name,
                     entity,
                     foundationYearString
                 }: { name: string; entity: string; foundationYear: string }) => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { createColla } = useCollesContext();

    function submitForm({ name, entity, foundationYearString }: { name: string, entity: string, foundationYear: string }) {
        setFormStatus(FormStatus.Loading);
        var foundationYear = parseInt(foundationYearString);
        try {
            createColla({id: "", name, entity, foundationYear })
                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    throw new Error("No s'ha pogut crear la colla. \nMotiu: "+e);
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