export const COINS_ERROR_MESSAGE = `Les monedes no són vàlides. Han de ser un número flotant positiu.`;

export function isUserCoinsValid(coins: number): boolean {
    if (!coins) return true;
    return coins >= 0;
}

export function UserCoinsNotValidError(coins: number): Error {
    return new Error(COINS_ERROR_MESSAGE+" Valor: "+coins);
}