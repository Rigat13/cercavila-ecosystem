export const LOGO_MAX_MBS = 2; // 2MB

export function isCollaLogoValid(logo: File | null): boolean {
    if (!logo) return false;
    const fileSizeInMB = logo.size / (1024 * 1024);
    return fileSizeInMB <= LOGO_MAX_MBS;
}

export function CollaLogoNotValidError(logo: File | null): Error {
    return new Error(`El logotip de la colla no és vàlid. Ha de tenir un pes inferior a ${LOGO_MAX_MBS}MB.`);
}