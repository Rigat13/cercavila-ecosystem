export const FIRST_COINS_ERROR_MESSAGE = `Les monedes no són vàlides. Han de ser un número flotant positiu.`;

export function isEventFirstCoinsRewardValid(coins: number): boolean {
    if (!coins) return true;
    return coins >= 0;
}

export function EventFirstCoinsRewardNotValidError(coins: number): Error {
    return new Error(FIRST_COINS_ERROR_MESSAGE+" Valor: "+coins);
}