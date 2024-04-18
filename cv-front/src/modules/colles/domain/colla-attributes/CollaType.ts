export const TYPE_MIN_LENGTH = 3;
export const TYPE_MAX_LENGTH = 120;
export const TYPE_ERROR_MESSAGE = `El tipus no és vàlid. El tipus ha de tenir entre ${TYPE_MIN_LENGTH} i ${TYPE_MAX_LENGTH} caràcters vàlids.`;

export function isCollaTypeValid(type: string): boolean {
    if (type.length <= TYPE_MIN_LENGTH || type.length > TYPE_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(type);
}

export function CollaTypeNotValidError(type: string): Error {
    return new Error(TYPE_ERROR_MESSAGE);
}

export const collaTypes = [
    { labelKey: 'collaTypeInstitutional' },
    { labelKey: 'collaTypeNeighbourhood' },
    { labelKey: 'collaTypeStreet' },

    { labelKey: 'collaTypeEntity' },
    { labelKey: 'collaTypeTheatrical' },
    { labelKey: 'collaTypeScout' },

    { labelKey: 'collaTypeNursingHome' },
    { labelKey: 'collaTypeSportsClub' },

    { labelKey: 'collaTypeSchool' },
    { labelKey: 'collaTypeInstitute' },
    { labelKey: 'collaTypeNursery' },

    { labelKey: 'collaTypePrivate' },
]