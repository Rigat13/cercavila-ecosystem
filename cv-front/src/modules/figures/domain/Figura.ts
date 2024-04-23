import {FiguraIdNotValidError, isFiguraIdValid} from "@/modules/figures/domain/figura-attributes/FiguraId";
import {FiguraNameNotValidError, isFiguraNameValid} from "@/modules/figures/domain/figura-attributes/FiguraName";
import {FiguraTypeNotValidError, isFiguraTypeValid} from "@/modules/figures/domain/figura-attributes/FiguraType";
import {FiguraImageNotValidError, isFiguraImageValid} from "@/modules/figures/domain/figura-attributes/FiguraImage";
import {FiguraWebUrlNotValidError, isFiguraWebUrlValid} from "@/modules/figures/domain/figura-attributes/FiguraWebUrl";
import {FiguraYearNotValidError, isFiguraYearValid} from "@/modules/figures/domain/figura-attributes/FiguraYear";

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