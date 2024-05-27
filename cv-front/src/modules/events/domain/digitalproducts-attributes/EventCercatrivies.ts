export const CERCATRIVIES_ERROR_MESSAGE = `Les cercatrivies no són vàlides.`;

export function isEventCercatriviesValid(cercatrivies: string): boolean {
    if (cercatrivies.length == 0 || !cercatrivies || cercatrivies == null) return true;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(cercatrivies);
}

export function EventCercatriviesNotValidError(cercatrivies: string): Error {
    return new Error(CERCATRIVIES_ERROR_MESSAGE+" Valor: "+cercatrivies);
}

export function concatenateCercatrivies (cercatrivies) {
    return digitalProducts.map(digitalProduct => cercatrivies.id).join(',');
}