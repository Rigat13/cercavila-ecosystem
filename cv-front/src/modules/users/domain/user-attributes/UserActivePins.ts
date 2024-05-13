export const ACTIVE_PINS_ERROR_MESSAGE = `Els pins actius no són vàlids`;

export function isUserActivePinsValid(activePins: string): boolean {
    if (activePins.length == 0 || activePins == null || activePins == undefined) return true;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(activePins);
}

export function UserActivePinsNotValidError(activePins: string): Error {
    return new Error(ACTIVE_PINS_ERROR_MESSAGE);
}

export function concatenateActivePins (selectedActivePins) {
    return selectedActivePins.map(activePin => activePin.id).join(',')
}