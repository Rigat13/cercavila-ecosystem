import {UUID} from "crypto";

export function isCollaIdValid(id: UUID): boolean {
    return true;
}

export function CollaIdNotValidError(id: UUID): Error {
    return new Error(`Id ${id} is not valid`);
}