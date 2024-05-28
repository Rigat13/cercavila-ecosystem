export const ALL_COINS_ERROR_MESSAGE = `Les monedes no són vàlides. Han de ser un número flotant positiu.`;

export function isEventAllCoinsRewardValid(coins: number): boolean {
    if (!coins) return true;
    return coins >= 0;
}

export function EventAllCoinsRewardNotValidError(coins: number): Error {
    return new Error(ALL_COINS_ERROR_MESSAGE+" Valor: "+coins);
}