import {useState} from "react";
import { useActivitiesContext} from "@/app/sections/activities/ActivitiesContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useActivityForm(): {
    submitForm: ({ question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer }:
                     { question: string; type: string; image: File | null; correctAnswer: string; firstIncorrectAnswer: string; secondIncorrectAnswer: string; })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { createActivity } = useActivitiesContext();

    function submitForm({ question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer }:
                            { question: string; type: string; image: File | null; correctAnswer: string; firstIncorrectAnswer: string; secondIncorrectAnswer: string; }) {
        setFormStatus(FormStatus.Loading);
        try {
            createActivity({id: "", question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer })

                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    throw new Error("No s'ha pogut crear l'activitat. \nMotiu: "+e);
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