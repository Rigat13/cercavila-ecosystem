export const SECOND_INCORRECT_ANSWER_MIN_LENGTH = 3;
export const SECOND_INCORRECT_ANSWER_MAX_LENGTH = 120;
export const SECOND_INCORRECT_ANSWER_ERROR_MESSAGE = `La resposta no és vàlida. Ha de tenir entre ${SECOND_INCORRECT_ANSWER_MIN_LENGTH} i ${SECOND_INCORRECT_ANSWER_MAX_LENGTH} caràcters vàlids.`;

export function isActivitySecondIncorrectAnswerValid(answer: string): boolean {
    if (answer.length < SECOND_INCORRECT_ANSWER_MIN_LENGTH || answer.length > SECOND_INCORRECT_ANSWER_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(answer);
}

export function ActivitySecondIncorrectAnswerNotValidError(answer: string): Error {
    return new Error(SECOND_INCORRECT_ANSWER_ERROR_MESSAGE);
}