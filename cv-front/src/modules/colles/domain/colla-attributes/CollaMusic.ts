export const MUSIC_MIN_LENGTH = 3;
export const MUSIC_MAX_LENGTH = 120;
export const MUSIC_ERROR_MESSAGE = `El tipus d'acompanyament musical no és vàlid. Ha de tenir entre ${MUSIC_MIN_LENGTH} i ${MUSIC_MAX_LENGTH} caràcters vàlids.`;

export function isCollaMusicValid(music: string): boolean {
    if (!music || music.length <= MUSIC_MIN_LENGTH || music.length > MUSIC_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(music);
}

export function CollaMusicNotValidError(music: string): Error {
    return new Error(MUSIC_ERROR_MESSAGE);
}

export const musics = [
    { labelKey: 'neighbourhoodCentre' },
    { labelKey: 'neighbourhoodEixample' },
    { labelKey: 'neighbourhoodPlaDenBoet' },
    { labelKey: 'neighbourhoodCerdanyola' },
    { labelKey: 'neighbourhoodPeramasEsmandies' },
    { labelKey: 'neighbourhoodLaLlantia' },
    { labelKey: 'neighbourhoodViaEuropaNouParcCentral' },
    { labelKey: 'neighbourhoodCirera' },
    { labelKey: 'neighbourhoodElsMolins' },
    { labelKey: 'neighbourhoodVistaAlegre' },
    { labelKey: 'neighbourhoodRocafonda' },
    { labelKey: 'neighbourhoodElPalau' },
    { labelKey: 'neighbourhoodLesSantesEscorxador' },
    { labelKey: 'neighbourhoodLHavana' },
    { labelKey: 'neighbourhoodLesCincSenies' },
    { labelKey: 'neighbourhoodVallveric' },
]