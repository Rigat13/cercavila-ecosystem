"use client";

import Image from "next/image";
import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {CollesContextProvider} from "@/app/sections/colles/CollesContext";
import {UpdateCollaForm} from "@/app/sections/colles/update-form/UpdateCollaForm";

export default function Update({ params }: { params: { collaId: string } }) {

    const repository = createApiCollaRepository();

    return (
        <CollesContextProvider repository={repository}>
            <Image
                src="/cercavila_logo.svg"
                alt="Logotip de Cercavila"
                className="dark:invert"
                width={100}
                height={24}
                priority
            />

            <div className = "Colles">
                <h1>Cercavila</h1>
                <UpdateCollaForm collaId={params.collaId}/>
            </div>
        </CollesContextProvider>
    )
}