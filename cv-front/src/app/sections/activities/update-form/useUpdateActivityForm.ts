import {useState} from "react";
import {useActivitiesContext} from "@/app/sections/activities/ActivitiesContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useUpdateActivityForm(): {
    submitForm: ({ id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer }:
                     { id: string; question: string; type: string; image: File | null; correctAnswer: string; firstIncorrectAnswer: string; secondIncorrectAnswer: string; })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { updateActivity } = useActivitiesContext();

    function submitForm({ id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer }:
                            { id: string; name: string; year: number; type: string; image: File | null; webUrl: string; }) {
        setFormStatus(FormStatus.Loading);
        try {
            updateActivity({ id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer })
                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    throw new Error("No s'ha pogut editar l'activitat. \nMotiu: "+e);
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