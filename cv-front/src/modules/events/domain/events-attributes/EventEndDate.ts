export const END_DATE_TIME_FORMAT = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
export const END_DATE_ERROR_MESSAGE = 'La data no és vàlida. La data ha de seguir el format YYYY-MM-DD HH:mm.';

export function isEventEndDateValid(date: string): boolean {
    return END_DATE_TIME_FORMAT.test(date);
}

export function EventEndDateNotValidError(date: string): Error {
    return new Error(END_DATE_ERROR_MESSAGE);
}
