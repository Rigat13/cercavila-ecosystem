export const PRICE_MIN = 0;
export const PRICE_ERROR_MESSAGE = `El preu no és vàlid. El preu ha de ser igual o superior a ${PRICE_MIN}.`;

export function isDigitalProductPriceValid(price: number): boolean {
    return price >= PRICE_MIN;
}

export function DigitalProductPriceNotValidError(price: number): Error {
    return new Error(PRICE_ERROR_MESSAGE);
}