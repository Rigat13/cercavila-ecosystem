export function isCollaFoundationYearValid(foundationYear: number): boolean {
    // Foundation year must be a positive number, integer and between 1400 and 2400
    return foundationYear % 1 == 0 && foundationYear > 1400 && foundationYear < 2400;
}

export function CollaFoundationYearNotValidError(foundationYear: number): Error {
    return new Error(`Foundation year ${foundationYear} is not valid`);
}