export function isActivityIdValid(id: string): boolean {
    const regexExp =
        /[a-zA-Z0-9]/gi;

    return regexExp.test(id);
}

export function ActivityIdNotValidError(id: string): Error {
    return new Error(`L'id ${id} no és vàlid.`);
}