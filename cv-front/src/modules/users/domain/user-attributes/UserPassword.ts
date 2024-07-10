import {defaultLang, dictionary} from "@/content";
const lang = defaultLang;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const PASSWORD_ERROR_WEAK = `La contrasenya és massa feble. Ha de tenir entre entre ${PASSWORD_MIN_LENGTH} i ${PASSWORD_MAX_LENGTH} caràcters vàlids, i ha de contenir lletres, números.`;
export const PASSWORD_ERROR_MEDIUM = 'La contrasenya és prou segura. Però si hi afegiu caràcters especials, serà encara més segura!';
export const PASSWORD_ERROR_STRONG = 'La contrasenya és molt segura!';

export function isUserPasswordValid(password: string): boolean { return getPasswordStrength(password) !== PASSWORD_ERROR_WEAK;}

export function UserPasswordNotValidError(password: string): Error {
    return new Error(getPasswordStrength(password));
}

export function getPasswordStrength(password): string {
    if (!password || password.length==0) return PASSWORD_ERROR_WEAK;
    if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH+1) return PASSWORD_ERROR_WEAK;

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);

    if (hasLetters && hasNumbers) {
        const hasSpecialChars = /[@$!%*?&]/.test(password);
        if (hasSpecialChars) return PASSWORD_ERROR_STRONG;
        else return PASSWORD_ERROR_MEDIUM;
    } else return PASSWORD_ERROR_WEAK;
}

export function getPasswordStrengthMessage(password: string, lang: string): string {
    const strength = getPasswordStrength(password);
    switch (strength) {
        case PASSWORD_ERROR_WEAK: return dictionary[lang]?.userPasswordWeak;
        case PASSWORD_ERROR_MEDIUM: return dictionary[lang]?.userPasswordMedium;
        case PASSWORD_ERROR_STRONG: return dictionary[lang]?.userPasswordStrong;
        default: return dictionary[lang]?.userPasswordWeak;
    }
}

export function calculatePasswordStrength(password: string): number {
    const strength = getPasswordStrength(password);
    if (strength === PASSWORD_ERROR_WEAK) return 20;
    if (strength === PASSWORD_ERROR_MEDIUM) return 60;
    if (strength === PASSWORD_ERROR_STRONG) return 100;
    return 0;
}

export function getStrengthColour(strength: number): string {
    if (strength > 60) return "#0aa947";
    if (strength > 30) return "#ffc82b";
    return "#ee4242";
}
