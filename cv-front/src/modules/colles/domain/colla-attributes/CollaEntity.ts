export function isCollaEntityValid(entity: string): boolean {
    // The name must start in uppercase, have at least 3 letters and up to 120 characters
    const regexExp = /^[A-Z][a-z]{2,120}$/;
    return regexExp.test(entity);
}

export function CollaEntityNotValidError(entity: string): Error {
    return new Error(`Entity ${entity} is not valid`);
}