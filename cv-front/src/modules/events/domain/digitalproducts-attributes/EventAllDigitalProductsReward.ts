export const ALL_DIGITAL_PRODUCTS_ERROR_MESSAGE = `Els productes digitals no són vàlids`;

export function isEventAllDigitalProductsRewardValid(digitalProducts: string): boolean {
    if (digitalProducts.length == 0 || !digitalProducts || digitalProducts == null) return true;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(digitalProducts);
}

export function EventAllDigitalProductsRewardNotValidError(digitalProducts: string): Error {
    return new Error(ALL_DIGITAL_PRODUCTS_ERROR_MESSAGE+" Valor: "+digitalProducts);
}

export function concatenateEventAllDigitalProductsReward (digitalProducts) {
    return digitalProducts.map(digitalProduct => digitalProduct.id).join(',');
}