import {CollaIdNotValidError, isCollaIdValid} from "@/modules/colles/domain/colla-attributes/CollaId";
import {CollaNameNotValidError, isCollaNameValid} from "@/modules/colles/domain/colla-attributes/CollaName";
import {CollaEntityNotValidError, isCollaEntityValid} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {
    CollaFoundationYearNotValidError,
    isCollaFoundationYearValid
} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";

export interface Colla {
    id: string;
    name: string;
    entity: string;
    foundationYear: number;
}

export function ensureCollaIsValid({id, name, entity, foundationYear}: Colla): void {
    if (!isCollaIdValid(id)) {
        throw CollaIdNotValidError(id);
    }
    if (!isCollaNameValid(name)) {
        throw CollaNameNotValidError(name);
    }
    if (!isCollaEntityValid(entity)) {
        throw CollaEntityNotValidError(entity);
    }
    if (!isCollaFoundationYearValid(foundationYear)) {
        throw CollaFoundationYearNotValidError(foundationYear);
    }
}

export function ensureCollaIsValidEmptyId({id, name, entity, foundationYear}: Colla): void {
    if (!isCollaNameValid(name)) {
        throw CollaNameNotValidError(name);
    }
    if (!isCollaEntityValid(entity)) {
        throw CollaEntityNotValidError(entity);
    }
    if (!isCollaFoundationYearValid(foundationYear)) {
        throw CollaFoundationYearNotValidError(foundationYear);
    }
}