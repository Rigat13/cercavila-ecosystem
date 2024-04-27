import {CollaPage} from "@/app/sections/colles/colla/CollaPage";
import {useCollesContext} from "@/app/sections/colles/CollesContext";

export function CollaPageHolder({collaId, lang}: {collaId: string; lang: string}) {
    const { colles } = useCollesContext();
    const colla = colles.find((colla) => colla.id === collaId);
    return (
        <section>
            <div>
                {colla && (<CollaPage colla={colla} lang={lang}/>)}
            </div>
        </section>
    )
}