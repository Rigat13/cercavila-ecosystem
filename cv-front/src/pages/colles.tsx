import Image from "next/image";

export default function Colles() {
    return (
        <Image
            src="/cercavila_logo.svg"
            alt="Logotip de Cercavila"
            className="dark:invert"
            width={100}
            height={24}
            priority
        />
    )
}