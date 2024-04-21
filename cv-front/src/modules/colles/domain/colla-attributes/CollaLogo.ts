export const LOGO_MAX_MBS = 2; // 2MB

export function isCollaLogoValid(logo: File | null): boolean {
    if (!logo) return false;
    const fileSizeInMB = logo.size / (1024 * 1024);
    return fileSizeInMB <= LOGO_MAX_MBS;
}