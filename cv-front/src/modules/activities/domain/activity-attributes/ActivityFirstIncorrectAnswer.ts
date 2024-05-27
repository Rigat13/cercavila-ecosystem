export const FIRST_INCORRECT_ANSWER_MIN_LENGTH = 3;
export const FIRST_INCORRECT_ANSWER_MAX_LENGTH = 120;
export const FIRST_INCORRECT_ANSWER_ERROR_MESSAGE = `La resposta no és vàlida. Ha de tenir entre ${FIRST_INCORRECT_ANSWER_MIN_LENGTH} i ${FIRST_INCORRECT_ANSWER_MAX_LENGTH} caràcters vàlids.`;

export function isActivityFirstIncorrectAnswerValid(answer: string): boolean {
    if (answer.length < FIRST_INCORRECT_ANSWER_MIN_LENGTH || answer.length > FIRST_INCORRECT_ANSWER_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',?!"()-]+$/gmu;
    return regexExp.test(answer);
}

export function ActivityFirstIncorrectAnswerNotValidError(answer: string): Error {
    return new Error(FIRST_INCORRECT_ANSWER_ERROR_MESSAGE);
}