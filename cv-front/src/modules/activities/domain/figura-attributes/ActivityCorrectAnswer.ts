export const CORRECT_ANSWER_MIN_LENGTH = 3;
export const CORRECT_ANSWER_MAX_LENGTH = 120;
export const CORRECT_ANSWER_ERROR_MESSAGE = `La resposta no és vàlida. Ha de tenir entre ${CORRECT_ANSWER_MIN_LENGTH} i ${CORRECT_ANSWER_MAX_LENGTH} caràcters vàlids.`;

export function isActivityAnswerValid(answer: string): boolean {
    if (answer.length < CORRECT_ANSWER_MIN_LENGTH || answer.length > CORRECT_ANSWER_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(answer);
}

export function ActivityAnswerNotValidError(answer: string): Error {
    return new Error(CORRECT_ANSWER_ERROR_MESSAGE);
}