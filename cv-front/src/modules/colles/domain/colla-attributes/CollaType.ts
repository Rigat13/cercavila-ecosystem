import React from "react";

export const TYPE_MIN_LENGTH = 3;
export const TYPE_MAX_LENGTH = 120;
export const TYPE_ERROR_MESSAGE = `El tipus no és vàlid. El tipus ha de tenir entre ${TYPE_MIN_LENGTH} i ${TYPE_MAX_LENGTH} caràcters vàlids.`;

export function isCollaTypeValid(type: string, defaultType: string) : boolean {
    if (type.length < TYPE_MIN_LENGTH || type.length > TYPE_MAX_LENGTH+1 || type === defaultType) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    const collaTypesLabels = collaTypes.map(collaType => collaType.labelKey);
    return regexExp.test(type) && collaTypesLabels.includes(type);
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

export const collaTypesFixed = {
    collaTypeInstitutional: 'collaTypeInstitutional',
    collaTypeNeighbourhood: 'collaTypeNeighbourhood',
    collaTypeStreet: 'collaTypeStreet',

    collaTypeEntity: 'collaTypeEntity',
    collaTypeTheatrical: 'collaTypeTheatrical',
    collaTypeScout: 'collaTypeScout',

    collaTypeNursingHome: 'collaTypeNursingHome',
    collaTypeSportsClub: 'collaTypeSportsClub',

    collaTypeSchool: 'collaTypeSchool',
    collaTypeInstitute: 'collaTypeInstitute',
    collaTypeNursery: 'collaTypeNursery',

    collaTypePrivate: 'collaTypePrivate',
}

export function getTypeAdditionalStyle(type: string): React.CSSProperties {
    let backgroundColor = "#000000"; let color = "#FFFFFF";
    switch (type) {
        case 'collaTypeInstitutional': backgroundColor = "#1c167e"; color = "#ff9f9f"; break;
        case 'collaTypeNeighbourhood': backgroundColor = "#234bd5"; color = "#ffffff"; break;
        case 'collaTypeStreet': backgroundColor = "#00805a"; color = "#FFFFFF"; break;
        case 'collaTypeEntity': backgroundColor = "#6028ef"; color = "#FFFFFF"; break;
        case 'collaTypeTheatrical': backgroundColor = "#800080"; color = "#FFFFFF"; break;
        case 'collaTypeScout': backgroundColor = "#4682B4"; color = "#FFFFFF"; break;
        case 'collaTypeNursingHome': backgroundColor = "#FF6347"; color = "#FFFFFF"; break;
        case 'collaTypeSportsClub': backgroundColor = "#111111"; color = "#ffdd50"; break;
        case 'collaTypeSchool': backgroundColor = "#e74848"; color = "#ffffff"; break;
        case 'collaTypeInstitute': backgroundColor = "#88073e"; color = "#FFFFFF"; break;
        case 'collaTypeNursery': backgroundColor = "#c77441"; color = "#FFFFFF"; break;
        case 'collaTypePrivate': backgroundColor = "#a5e855"; color = "#000000"; break;
        default: backgroundColor = "#000000"; color = "#FFFFFF"; break;
    }
    return { backgroundColor, color };
}