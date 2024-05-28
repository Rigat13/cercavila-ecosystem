export const FOURTH_TENTH_COINS_ERROR_MESSAGE = `Les monedes no són vàlides. Han de ser un número flotant positiu.`;

export function isEventFourthTenthCoinsRewardValid(coins: number): boolean {
    if (!coins) return true;
    return coins >= 0;
}

export function EventFourthTenthCoinsRewardNotValidError(coins: number): Error {
    return new Error(FOURTH_TENTH_COINS_ERROR_MESSAGE+" Valor: "+coins);
}