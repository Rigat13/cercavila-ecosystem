import {FiguraIdNotValidError, isFiguraIdValid} from "@/modules/figures/domain/figura-attributes/FiguraId";
import {FiguraNameNotValidError, isFiguraNameValid} from "@/modules/figures/domain/figura-attributes/FiguraName";
import {FiguraEntityNotValidError, isFiguraEntityValid} from "@/modules/figures/domain/figura-attributes/FiguraEntity";
import {FiguraFoundationYearNotValidError, isFiguraFoundationYearValid} from "@/modules/figures/domain/figura-attributes/FiguraFoundationYear";
import {FiguraDescriptionNotValidError, isFiguraDescriptionValid} from "@/modules/figures/domain/figura-attributes/FiguraDescription";
import {FiguraTypeNotValidError, isFiguraTypeValid} from "@/modules/figures/domain/figura-attributes/FiguraType";
import {FiguraNeighbourhoodNotValidError, isFiguraNeighbourhoodValid} from "@/modules/figures/domain/figura-attributes/FiguraNeighbourhood";
import {FiguraColourNotValidError, isFiguraColourValid} from "@/modules/figures/domain/figura-attributes/FiguraColours";
import {FiguraImageNotValidError, isFiguraImageValid} from "@/modules/figures/domain/figura-attributes/FiguraImage";
import {FiguraMusicNotValidError, isFiguraMusicValid} from "@/modules/figures/domain/figura-attributes/FiguraMusic";
import {FiguraEmailNotValidError, isFiguraEmailValid} from "@/modules/figures/domain/figura-attributes/FiguraEmail";
import {FiguraWebUrlNotValidError, isFiguraWebUrlValid} from "@/modules/figures/domain/figura-attributes/FiguraWebUrl";
import {FiguraYearNotValidError, isFiguraYearValid} from "@/modules/figures/domain/colla-attributes/FiguraYear";

export interface Figura {
    id: string;
    name: string;
    year: number;
    type: string;
    image: File | null;
    webUrl: string;
}

export function ensureFiguraIsValid({id, name, year, type, image, webUrl}: Figura): void {
    if (!isFiguraIdValid(id)) {
        throw FiguraIdNotValidError(id);
    }
    ensureFiguraIsValidEmptyId({id, name, year, type, image, webUrl});
}

export function ensureFiguraIsValidEmptyId({id, name, year, type, image, webUrl}: Figura): void {
    if (!isFiguraNameValid(name)) {
        throw FiguraNameNotValidError(name);
    }
    if (!isFiguraYearValid(year)) {
        throw FiguraYearNotValidError(year);
    }
    if (!isFiguraTypeValid(type, "")) {
        throw FiguraTypeNotValidError(type);
    }
    if (!isFiguraImageValid(image)) {
        throw FiguraImageNotValidError(image);
    }
    if (!isFiguraWebUrlValid(webUrl)) {
        throw FiguraWebUrlNotValidError(webUrl);
    }
}

export function ensureFiguraIdIsValid(id: string): void {
    if (!isFiguraIdValid(id)) {
        throw FiguraIdNotValidError(id);
    }
}