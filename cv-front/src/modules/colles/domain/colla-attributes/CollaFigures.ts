import {Figura} from "@/modules/figures/domain/Figura";

export const FIGURES_ERROR_MESSAGE = `Les figures no són vàlides`;

export function isCollaFiguresValid(figures: string): boolean {
    if (figures == null) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(figures);
}

export function CollaFiguresNotValidError(figures: string): Error {
    return new Error(FIGURES_ERROR_MESSAGE);
}

export function concatenateFigures (selectedFigures: Figura[]) {
    return selectedFigures.map(figure => figure.id).join(',')
}