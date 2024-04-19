import {CollaIdNotValidError, isCollaIdValid} from "@/modules/colles/domain/colla-attributes/CollaId";
import {CollaNameNotValidError, isCollaNameValid} from "@/modules/colles/domain/colla-attributes/CollaName";
import {CollaEntityNotValidError, isCollaEntityValid} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {CollaFoundationYearNotValidError, isCollaFoundationYearValid} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {CollaDescriptionNotValidError, isCollaDescriptionValid} from "@/modules/colles/domain/colla-attributes/CollaDescription";
import {CollaTypeNotValidError, isCollaTypeValid} from "@/modules/colles/domain/colla-attributes/CollaType";
import {CollaNeighbourhoodNotValidError, isCollaNeighbourhoodValid} from "@/modules/colles/domain/colla-attributes/CollaNeighbourhood";
import {CollaColourNotValidError, isCollaColourValid} from "@/modules/colles/domain/colla-attributes/CollaColours";

export interface Colla {
    id: string;
    name: string;
    entity: string;
    foundationYear: number;
    description: string;
    type: string;
    neighbourhood: string;
    primaryColour: string;
    secondaryColour: string;
}

export function ensureCollaIsValid({id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour}: Colla): void {
    if (!isCollaIdValid(id)) {
        throw CollaIdNotValidError(id);
    }
    ensureCollaIsValidEmptyId({id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour});
}

export function ensureCollaIsValidEmptyId({id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour}: Colla): void {
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
    if (!isCollaColourValid(primaryColour)) {
        throw CollaColourNotValidError(primaryColour);
    }
    if (!isCollaColourValid(secondaryColour)) {
        throw CollaColourNotValidError(secondaryColour);
    }
}

export function ensureCollaIdIsValid(id: string): void {
    if (!isCollaIdValid(id)) {
        throw CollaIdNotValidError(id);
    }
}