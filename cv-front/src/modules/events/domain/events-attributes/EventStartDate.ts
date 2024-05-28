export const START_DATE_TIME_FORMAT = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
export const START_DATE_ERROR_MESSAGE = 'La data no és vàlida. La data ha de seguir el format YYYY-MM-DD HH:mm.';

export function isEventStartDateValid(date: string): boolean {
    return START_DATE_TIME_FORMAT.test(date);
}

export function EventStartDateNotValidError(date: string): Error {
    return new Error(START_DATE_ERROR_MESSAGE);
}
