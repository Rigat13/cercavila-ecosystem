"use client";

import Image from "next/image";
import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {CollesContextProvider} from "@/app/sections/colles/CollesContext";
import {CollesList} from "@/app/sections/colles/list/CollesList";
import {CreateCollaForm} from "@/app/sections/colles/form/CreateCollaForm";

export default function Page() {
    const repository = createApiCollaRepository();

    return (
        <CollesContextProvider repository={repository}>
            <Image
                src="/cercavila_logo.svg"
                alt="Logotip de Cercavila"
                className=""// dark:invert for dark logo on dark mode
                width={100}
                height={24}
                priority
            />

            <div className = "Colles">
                <h1>Cercavila</h1>
                <CollesList />
                <CreateCollaForm />
            </div>
        </CollesContextProvider>
    )
}