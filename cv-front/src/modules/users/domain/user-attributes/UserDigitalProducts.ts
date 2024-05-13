export const DIGITAL_PRODUCTS_ERROR_MESSAGE = `Els productes digitals no són vàlids`;

export function isUserDigitalProductsValid(digitalProduct: string): boolean {
    if (digitalProduct == null) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(digitalProduct);
}

export function UserDigitalProductsNotValidError(digitalProduct: string): Error {
    return new Error(DIGITAL_PRODUCTS_ERROR_MESSAGE);
}

export function concatenateUserDigitalProducts (digitalProducts) {
    return digitalProducts.map(digitalProduct => digitalProduct.id).join(',');
}