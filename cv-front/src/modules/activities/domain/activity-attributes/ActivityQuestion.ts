export const QUESTION_MIN_LENGTH = 3;
export const QUESTION_MAX_LENGTH = 120;
export const QUESTION_ERROR_MESSAGE = `La pregunta no és vàlida. La pregunta ha de tenir entre ${QUESTION_MIN_LENGTH} i ${QUESTION_MAX_LENGTH} caràcters vàlids.`;

export function isActivityQuestionValid(question: string): boolean {
    if (question.length < QUESTION_MIN_LENGTH || question.length > QUESTION_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',?!"()-]+$/gmu;
    return regexExp.test(question);
}

export function ActivityQuestionNotValidError(name: string): Error {
    return new Error(QUESTION_ERROR_MESSAGE);
}