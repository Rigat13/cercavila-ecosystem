export function isCollaNameValid(name: string): boolean {
    // The name must start in uppercase, have at least 3 letters and up to 120 characters
    const regexExp = /^[A-Z][a-z]{2,120}$/;
    return regexExp.test(name);
}

export function CollaNameNotValidError(name: string): Error {
    return new Error(`Name ${name} is not valid`);
}