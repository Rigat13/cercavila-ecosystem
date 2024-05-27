export function isDigitalProductIdValid(id: string): boolean {
    const regexExp =
        /[a-zA-Z0-9]/gi;

    return regexExp.test(id);
}

export function DigitalProductIdNotValidError(id: string): Error {
    return new Error(`L'id ${id} no és vàlid.`);
}