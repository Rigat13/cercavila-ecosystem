export const EMAIL_MIN_LENGTH = 3;
export const EMAIL_MAX_LENGTH = 120;
export const EMAIL_ERROR_MESSAGE = `El correu electrònic no és vàlid. Ha de tenir entre ${EMAIL_MIN_LENGTH} i ${EMAIL_MAX_LENGTH} caràcters vàlids en format de correu.`;
export const EMAIL_EXISTING_ERROR_MESSAGE = `El correu electrònic ja existeix.`;

export function isUserEmailValid(email: string): boolean {
    if (!email || email.length < EMAIL_MIN_LENGTH || email.length > EMAIL_MAX_LENGTH+1) return false;
    const regexExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexExp.test(email);
}

export function alreadyExistingEmail(email: string, existingEmails: string[]): boolean {
    if (existingEmails == null || existingEmails[0] == undefined) return false;
    return existingEmails.includes(email);
}

export function UserEmailNotValidError(email: string, existingEmails: string[]): Error {
    if (!email) return new Error(EMAIL_ERROR_MESSAGE);
    if (existingEmails.includes(email)) return new Error(EMAIL_EXISTING_ERROR_MESSAGE);
    return new Error(EMAIL_ERROR_MESSAGE);
}