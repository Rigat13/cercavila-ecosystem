import {CollaPage} from "@/app/sections/colles/colla/CollaPage";
import {useCollesContext} from "@/app/sections/colles/CollesContext";
import {collaIsCCGM} from "@/modules/colles/domain/Colla";
import {CCGMPage} from "@/app/sections/colles/colla/CCGMPage";

export function CollaPageHolder({collaId, lang}: {collaId: string; lang: string}) {
    const { colles } = useCollesContext();
    const colla = colles.find((colla) => colla.id === collaId);
    const isRegularColla = !collaIsCCGM(collaId);
    return (
        <section>
            {isRegularColla && colla && (<CollaPage colla={colla} lang={lang}/>)}
            {!isRegularColla && colla &&(<CCGMPage colla={colla} lang={lang}/>)}
        </section>
    )
}