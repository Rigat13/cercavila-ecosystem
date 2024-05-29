import {useState} from "react";
import {useEventsContext} from "@/app/sections/events/EventsContext";
export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial,
}

export function useUpdateEventForm(): {
    submitForm: ({ id, name, description, image, primaryColour, secondaryColour, type, startDate, startTime, endDate, endTime, cercatrivies,
                     firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                     thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                     allCoinsReward, allDigitalProductsReward }:
                     { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string;
                         type: string; startDate: string; startTime: string; endDate: string; endTime: string; cercatrivies: string[]; firstCoinsReward: number; firstDigitalProductsReward: string[];
                         secondCoinsReward: number; secondDigitalProductsReward: string[]; thirdCoinsReward: number; thirdDigitalProductsReward: string[];
                         fourthTenthCoinsReward: number; fourthTenthDigitalProductsReward: string[]; allCoinsReward: number; allDigitalProductsReward: string[]; })
        => void; formStatus: FormStatus; resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial);
    const { updateEvent } = useEventsContext();

    function submitForm({ id, name, description, image, primaryColour, secondaryColour, type, startDate, startTime, endDate, endTime, cercatrivies,
                            firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                            thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                            allCoinsReward, allDigitalProductsReward }:
                            { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string;
                                type: string; startDate: string; startTime: string; endDate: string; endTime: string; cercatrivies: string[]; firstCoinsReward: number; firstDigitalProductsReward: string[];
                                secondCoinsReward: number; secondDigitalProductsReward: string[]; thirdCoinsReward: number; thirdDigitalProductsReward: string[];
                                fourthTenthCoinsReward: number; fourthTenthDigitalProductsReward: string[]; allCoinsReward: number; allDigitalProductsReward: string[]; }) {
        setFormStatus(FormStatus.Loading);
        startDate = startDate + " " + startTime;
        endDate = endDate + " " + endTime;
        try {
            updateEvent({ id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
                firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                allCoinsReward, allDigitalProductsReward })
                .then(() => {
                    setFormStatus(FormStatus.Success);
                })
                .catch((e) => {
                    throw new Error("No s'ha pogut editar el producte digital. \nMotiu: "+e);
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