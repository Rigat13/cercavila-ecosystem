export const COINS_ERROR_MESSAGE = `Les monedes no són vàlides. Han de ser un número flotant positiu.`;

export function isUserCoinsValid(coins: number): boolean {
    if (coins == null) return false;
    return coins > 0;
}

export function UserCoinsNotValidError(foundationYear: number): Error {
    return new Error(COINS_ERROR_MESSAGE);
}