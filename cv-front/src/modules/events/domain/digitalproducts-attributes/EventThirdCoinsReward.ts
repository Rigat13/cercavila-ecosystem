export const THIRD_COINS_ERROR_MESSAGE = `Les monedes no són vàlides. Han de ser un número flotant positiu.`;

export function isEventThirdCoinsRewardValid(coins: number): boolean {
    if (!coins) return true;
    return coins >= 0;
}

export function EventThirdCoinsRewardNotValidError(coins: number): Error {
    return new Error(THIRD_COINS_ERROR_MESSAGE+" Valor: "+coins);
}