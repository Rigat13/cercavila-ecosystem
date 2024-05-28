export const FIRST_DIGITAL_PRODUCTS_ERROR_MESSAGE = `Els productes digitals no són vàlids`;

export function isEventFirstDigitalProductsRewardValid(digitalProducts: string): boolean {
    if (digitalProducts.length == 0 || !digitalProducts || digitalProducts == null) return true;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(digitalProducts);
}

export function EventFirstDigitalProductsRewardNotValidError(digitalProducts: string): Error {
    return new Error(FIRST_DIGITAL_PRODUCTS_ERROR_MESSAGE+" Valor: "+digitalProducts);
}

export function concatenateEventFirstDigitalProductsReward (digitalProducts) {
    return digitalProducts.map(digitalProduct => digitalProduct.id).join(',');
}