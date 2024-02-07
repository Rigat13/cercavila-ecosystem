export const ENTITY_MIN_LENGTH = 3;
export const ENTITY_MAX_LENGTH = 120;

export function isCollaEntityValid(entity: string): boolean {
    if (entity.length < ENTITY_MIN_LENGTH || entity.length > ENTITY_MAX_LENGTH) return false;
    // The name must start in uppercase
    const regexExp = /^[A-Z][a-z]$/;
    return regexExp.test(entity);
}

export function CollaEntityNotValidError(entity: string): Error {
    return new Error(`Entity ${entity} is not valid`);
}