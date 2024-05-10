export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const PASSWORD_ERROR_WEAK = `La contrasenya és massa feble. Ha de tenir entre entre ${PASSWORD_MIN_LENGTH} i ${PASSWORD_MAX_LENGTH} caràcters vàlids, i ha de contenir lletres, números.`;
export const PASSWORD_ERROR_MEDIUM = 'La contrasenya és prou segura. Però si hi afegiu caràcters especials, serà encara més segura!';
export const PASSWORD_ERROR_STRONG = 'La contrasenya és molt segura!';


export function isUserPasswordValid(password: string): boolean {
    return getPasswordStrength(password) !== PASSWORD_ERROR_WEAK;
}

export function UserPasswordNotValidError(password: string): Error {
    return new Error(getPasswordStrength(password));
}

export function getPasswordStrength(password): string {
    if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH+1) return PASSWORD_ERROR_WEAK;

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);

    if (hasLetters && hasNumbers) {
        const hasSpecialChars = /[@$!%*?&]/.test(password);
        if (hasSpecialChars) return PASSWORD_ERROR_STRONG;
        else return PASSWORD_ERROR_MEDIUM;
    } else return PASSWORD_ERROR_WEAK;
}