import {ActivityIdNotValidError, isActivityIdValid} from "@/modules/activities/domain/activity-attributes/ActivityId";
import {ActivityQuestionNotValidError, isActivityQuestionValid} from "@/modules/activities/domain/activity-attributes/ActivityQuestion";
import {ActivityTypeNotValidError, isActivityTypeValid} from "@/modules/activities/domain/activity-attributes/ActivityType";
import {ActivityImageNotValidError, isActivityImageValid} from "@/modules/activities/domain/activity-attributes/ActivityImage";
import {ActivityCorrectAnswerNotValidError, isActivityCorrectAnswerValid} from "@/modules/activities/domain/activity-attributes/ActivityCorrectAnswer";
import {ActivityFirstIncorrectAnswerNotValidError, isActivityFirstIncorrectAnswerValid} from "@/modules/activities/domain/activity-attributes/ActivityFirstIncorrectAnswer";
import {ActivitySecondIncorrectAnswerNotValidError, isActivitySecondIncorrectAnswerValid} from "@/modules/activities/domain/activity-attributes/ActivitySecondIncorrectAnswer";

export interface Activity {
    id: string;
    question: string;
    type: string;
    image: File | null;
    correctAnswer: string;
    firstIncorrectAnswer: string;
    secondIncorrectAnswer: string;
}

export function ensureActivityIsValid({id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer}: Activity): void {
    if (!isActivityIdValid(id)) {
        throw ActivityIdNotValidError(id);
    }
    ensureActivityIsValidEmptyId({id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer});
}

export function ensureActivityIsValidEmptyId({id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer}: Activity): void {
    if (!isActivityQuestionValid(question)) {
        throw ActivityQuestionNotValidError(question);
    }
    if (!isActivityTypeValid(type, "")) {
        throw ActivityTypeNotValidError(type);
    }
    if (!isActivityImageValid(image)) {
        throw ActivityImageNotValidError(image);
    }
    if (!isActivityCorrectAnswerValid(correctAnswer)) {
        throw ActivityCorrectAnswerNotValidError(correctAnswer);
    }
    if (!isActivityFirstIncorrectAnswerValid(firstIncorrectAnswer)) {
        throw ActivityFirstIncorrectAnswerNotValidError(firstIncorrectAnswer);
    }
    if (!isActivitySecondIncorrectAnswerValid(secondIncorrectAnswer)) {
        throw ActivitySecondIncorrectAnswerNotValidError(secondIncorrectAnswer);
    }
}

export function ensureActivityIdIsValid(id: string): void {
    if (!isActivityIdValid(id)) {
        throw ActivityIdNotValidError(id);
    }
}