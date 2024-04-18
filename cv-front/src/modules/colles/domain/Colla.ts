import {CollaIdNotValidError, isCollaIdValid} from "@/modules/colles/domain/colla-attributes/CollaId";
import {CollaNameNotValidError, isCollaNameValid} from "@/modules/colles/domain/colla-attributes/CollaName";
import {CollaEntityNotValidError, isCollaEntityValid} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {
    CollaFoundationYearNotValidError,
    isCollaFoundationYearValid
} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {
    CollaDescriptionNotValidError,
    isCollaDescriptionValid
} from "@/modules/colles/domain/colla-attributes/CollaDescription";
import {CollaTypeNotValidError, isCollaTypeValid} from "@/modules/colles/domain/colla-attributes/CollaType";
import {
    CollaNeighbourhoodNotValidError,
    isCollaNeighbourhoodValid
} from "@/modules/colles/domain/colla-attributes/CollaNeighbourhood";

export interface Colla {
    id: string;
    name: string;
    entity: string;
    foundationYear: number;
    description: string;
    type: string;
    neighbourhood: string;
}

export function ensureCollaIsValid({id, name, entity, foundationYear, description, type, neighbourhood}: Colla): void {
    if (!isCollaIdValid(id)) {
        throw CollaIdNotValidError(id);
    }
    ensureCollaIsValidEmptyId({id, name, entity, foundationYear, description, type, neighbourhood});
}

export function ensureCollaIsValidEmptyId({id, name, entity, foundationYear, description, type, neighbourhood}: Colla): void {
    if (!isCollaNameValid(name)) {
        throw CollaNameNotValidError(name);
    }
    if (!isCollaEntityValid(entity)) {
        throw CollaEntityNotValidError(entity);
    }
    if (!isCollaFoundationYearValid(foundationYear)) {
        throw CollaFoundationYearNotValidError(foundationYear);
    }
    if (!isCollaDescriptionValid(description)) {
        throw CollaDescriptionNotValidError(description);
    }
    if (!isCollaTypeValid(type)) {
        throw CollaTypeNotValidError(type);
    }
    if (!isCollaNeighbourhoodValid(neighbourhood)) {
        throw CollaNeighbourhoodNotValidError(neighbourhood);
    }
}

export function ensureCollaIdIsValid(id: string): void {
    if (!isCollaIdValid(id)) {
        throw CollaIdNotValidError(id);
    }
}