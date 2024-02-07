import Image from "next/image";
import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {CollesContextProvider} from "@/pages/colles/CollesContext";
import {CollesList} from "@/pages/colles/list/CollesList";
import {CreateCollaForm} from "@/pages/colles/form/CreateCollaForm";

export default function Colles() {
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
                <CollesList />
                <CreateCollaForm />
            </div>
        </CollesContextProvider>
    )
}