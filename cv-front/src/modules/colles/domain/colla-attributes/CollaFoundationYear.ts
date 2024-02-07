export const FOUNDATION_YEAR_MIN = 1400;
export const FOUNDATION_YEAR_MAX = 2400;

export function isCollaFoundationYearValid(foundationYear: number): boolean {
    // Foundation year must be a positive number, integer and between 1400 and 2400
    return foundationYear % 1 == 0 && foundationYear >= FOUNDATION_YEAR_MIN && foundationYear <= FOUNDATION_YEAR_MAX;
}

export function CollaFoundationYearNotValidError(foundationYear: number): Error {
    return new Error(`Foundation year ${foundationYear} is not valid`);
}