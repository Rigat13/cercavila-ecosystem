export const END_DATE_TIME_FORMAT = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
export const END_DATE_ERROR_MESSAGE = 'La data no és vàlida. La data ha de seguir el format YYYY-MM-DD HH:mm i ser posterior a la data d\'inici.';

export function isEventEndDateValid(startDate: string, endDate): boolean {
    if (!endDate.match(END_DATE_TIME_FORMAT)) {
        return false;
    }
    return new Date(startDate) < new Date(endDate);
}

export function EventEndDateNotValidError(date: string): Error {
    return new Error(END_DATE_ERROR_MESSAGE);
}
