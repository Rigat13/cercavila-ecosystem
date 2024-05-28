export const SECOND_COINS_ERROR_MESSAGE = `Les monedes no són vàlides. Han de ser un número flotant positiu.`;

export function isEventSecondCoinsRewardValid(coins: number): boolean {
    if (!coins) return true;
    return coins >= 0;
}

export function EventSecondCoinsRewardNotValidError(coins: number): Error {
    return new Error(SECOND_COINS_ERROR_MESSAGE+" Valor: "+coins);
}