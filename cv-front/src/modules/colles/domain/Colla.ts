import {CollaIdNotValidError, isCollaIdValid} from "@/modules/colles/domain/colla-attributes/CollaId";
import {CollaNameNotValidError, isCollaNameValid} from "@/modules/colles/domain/colla-attributes/CollaName";
import {CollaEntityNotValidError, isCollaEntityValid} from "@/modules/colles/domain/colla-attributes/CollaEntity";
import {CollaFoundationYearNotValidError, isCollaFoundationYearValid} from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {CollaDescriptionNotValidError, isCollaDescriptionValid} from "@/modules/colles/domain/colla-attributes/CollaDescription";
import {CollaTypeNotValidError, isCollaTypeValid} from "@/modules/colles/domain/colla-attributes/CollaType";
import {CollaNeighbourhoodNotValidError, isCollaNeighbourhoodValid} from "@/modules/colles/domain/colla-attributes/CollaNeighbourhood";
import {CollaColourNotValidError, isCollaColourValid} from "@/modules/colles/domain/colla-attributes/CollaColours";
import {CollaLogoNotValidError, isCollaLogoValid} from "@/modules/colles/domain/colla-attributes/CollaLogo";
import {CollaMusicNotValidError, isCollaMusicValid} from "@/modules/colles/domain/colla-attributes/CollaMusic";
import {CollaEmailNotValidError, isCollaEmailValid} from "@/modules/colles/domain/colla-attributes/CollaEmail";
import {CollaInstagramNotValidError, isCollaInstagramValid} from "@/modules/colles/domain/colla-attributes/CollaInstagram";
import {isCollaFiguresValid} from "@/modules/colles/domain/colla-attributes/CollaFigures";

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
    logo: File | null;
    music: string;
    email: string;
    instagram: string;
    figures: string;
}

export function ensureCollaIsValid({id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, logo, music, email, instagram, figures}: Colla): void {
    if (!isCollaIdValid(id)) {
        throw CollaIdNotValidError(id);
    }
    ensureCollaIsValidEmptyId({id, name, entity, foundationYear, description, type, neighbourhood,
        primaryColour, secondaryColour, logo, music, email, instagram, figures});
}

export function ensureCollaIsValidEmptyId({id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, logo, music, email, instagram, figures}: Colla): void {
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
    if (!isCollaTypeValid(type, "")) {
        throw CollaTypeNotValidError(type);
    }
    if (!isCollaNeighbourhoodValid(neighbourhood, "")) {
        throw CollaNeighbourhoodNotValidError(neighbourhood);
    }
    if (!isCollaColourValid(primaryColour)) {
        throw CollaColourNotValidError(primaryColour);
    }
    if (!isCollaColourValid(secondaryColour)) {
        throw CollaColourNotValidError(secondaryColour);
    }
    if (!isCollaLogoValid(logo)) {
        throw CollaLogoNotValidError(logo);
    }
    if (!isCollaMusicValid(music, "")) {
        throw CollaMusicNotValidError(music);
    }
    if (!isCollaEmailValid(email)) {
        throw CollaEmailNotValidError(email);
    }
    if (!isCollaInstagramValid(instagram)) {
        throw CollaInstagramNotValidError(instagram);
    }
    if (!isCollaFiguresValid(figures)) {
        throw CollaNameNotValidError(figures);
    }
}

export function ensureCollaIdIsValid(id: string): void {
    if (!isCollaIdValid(id)) {
        throw CollaIdNotValidError(id);
    }
}