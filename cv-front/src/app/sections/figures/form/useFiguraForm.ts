import {useState} from "react";
import { useFiguresContext} from "@/app/sections/figures/FiguresContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useFiguraForm(): {
    submitForm: ({ name, year, type, image, webUrl }:
                     { name: string; year: number; type: string; image: File | null; webUrl: string; })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { createFigura } = useFiguresContext();

    function submitForm({ name, year, type, image, webUrl }:
                            { name: string; year: number; type: string; image: File | null; webUrl: string; }) {
        setFormStatus(FormStatus.Loading);
        try {
            createFigura({id: "", name, year, type, image, webUrl })

                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    throw new Error("No s'ha pogut crear la figura. \nMotiu: "+e);
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