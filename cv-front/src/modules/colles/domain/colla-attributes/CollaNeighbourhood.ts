export const NEIGHBOURHOOD_MIN_LENGTH = 3;
export const NEIGHBOURHOOD_MAX_LENGTH = 120;
export const NEIGHBOURHOOD_ERROR_MESSAGE = `El barri no és vàlid. El barri ha de tenir entre ${NEIGHBOURHOOD_MIN_LENGTH} i ${NEIGHBOURHOOD_MAX_LENGTH} caràcters vàlids.`;

export function isCollaNeighbourhoodValid(neighbourhood: string, defaultNeighbourhood: string): boolean {
    if (neighbourhood.length <= NEIGHBOURHOOD_MIN_LENGTH || neighbourhood.length > NEIGHBOURHOOD_MAX_LENGTH+1 || neighbourhood === defaultNeighbourhood) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(neighbourhood);
}

export function CollaNeighbourhoodNotValidError(neighbourhood: string): Error {
    return new Error(NEIGHBOURHOOD_ERROR_MESSAGE);
}

export const neighbourhoods = [
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