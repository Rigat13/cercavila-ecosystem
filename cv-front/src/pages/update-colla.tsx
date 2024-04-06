import Image from "next/image";
import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {CollesContextProvider} from "@/sections/colles/CollesContext";
import {UpdateCollaForm} from "@/sections/colles/update-form/UpdateCollaForm";
import {useRouter} from "next/router";

export default function UpdateColla() {
    const router = useRouter();
    const { collaId } = router.query; // Allows to receive the collaId from the URL, from CollaCard.tsx

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
                <UpdateCollaForm collaId={collaId}/>
            </div>
        </CollesContextProvider>
    )
}