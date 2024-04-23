export const YEAR_MIN = 1400;
export const YEAR_MAX = 2400;
export const YEAR_ERROR_MESSAGE = `L'any no és vàlid. L'any ha de ser un nombre enter positiu entre ${YEAR_MIN} i ${YEAR_MAX}.`;

export function isFiguraYearValid(year: number): boolean {
    year = Math.floor(year);
    return year % 1 == 0 && year >= YEAR_MIN && year <= YEAR_MAX;
}

export function FiguraYearNotValidError(year: number): Error {
    return new Error(YEAR_ERROR_MESSAGE);
}