export const ENTITY_MIN_LENGTH = 3;
export const ENTITY_MAX_LENGTH = 120;
export const ENTITY_ERROR_MESSAGE = `L'entitat no és vàlida. L'entitat ha de tenir entre ${ENTITY_MIN_LENGTH} i ${ENTITY_MAX_LENGTH} caràcters vàlids.`;

export function isCollaEntityValid(entity: string): boolean {
    if (entity.length <= ENTITY_MIN_LENGTH || entity.length >= ENTITY_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.'-]+$/gmu;
    return regexExp.test(entity);
}

export function CollaEntityNotValidError(entity: string): Error {
    return new Error(ENTITY_ERROR_MESSAGE);
}