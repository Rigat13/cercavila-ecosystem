export const TYPE_MIN_LENGTH = 3;
export const TYPE_MAX_LENGTH = 120;
export const TYPE_ERROR_MESSAGE = `El tipus no és vàlid. El tipus ha de tenir entre ${TYPE_MIN_LENGTH} i ${TYPE_MAX_LENGTH} caràcters vàlids.`;

export function isFiguraTypeValid(type: string, defaultType: string) : boolean {
    if (type.length <= TYPE_MIN_LENGTH || type.length > TYPE_MAX_LENGTH+1 || type === defaultType) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    const figuraTypesLabels = figuraTypes.map(figuraType => figuraType.labelKey);
    return regexExp.test(type) && figuraTypesLabels.includes(type);
}

export function FiguraTypeNotValidError(type: string): Error {
    return new Error(TYPE_ERROR_MESSAGE);
}

export const figuraTypes = [
    { labelKey: 'figuraTypeGegant' },
    { labelKey: 'figuraTypeGeganto' },
    { labelKey: 'figuraTypeCapgros' },
    { labelKey: 'figuraTypeNan' },
    { labelKey: 'figuraTypeBestia' },
    { labelKey: 'figuraTypeMotxilla' },
]

export const figuraTypesFixed = {
    figuraTypeGegant: 'figuraTypeGegant',
    figuraTypeGeganto: 'figuraTypeGeganto',
    figuraTypeCapgros: 'figuraTypeCapgros',
    figuraTypeNan: 'figuraTypeNan',
    figuraTypeBestia: 'figuraTypeBestia',
    figuraTypeMotxilla: 'figuraTypeMotxilla',
};
