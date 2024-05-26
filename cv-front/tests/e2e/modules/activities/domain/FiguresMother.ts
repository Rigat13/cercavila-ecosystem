import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import {Activity} from "@/modules/activities/domain/Activity";
import {QUESTION_MAX_LENGTH, QUESTION_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityQuestion";
import {TYPE_MAX_LENGTH, TYPE_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityType";
import {CORRECT_ANSWER_MAX_LENGTH, CORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityCorrectAnswer";
import {FIRST_INCORRECT_ANSWER_MAX_LENGTH, FIRST_INCORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivityFirstIncorrectAnswer";
import {SECOND_INCORRECT_ANSWER_MAX_LENGTH, SECOND_INCORRECT_ANSWER_MIN_LENGTH} from "@/modules/activities/domain/activity-attributes/ActivitySecondIncorrectAnswer";

const ActivityFactory = Factory.define<Activity>(() => ({
    id: faker.string.uuid(),
    question: faker.lorem.sentence(),
    type: faker.lorem.sentence(),
    image: null,
    correctAnswer: faker.lorem.sentence(),
    firstIncorrectAnswer: faker.lorem.sentence(),
    secondIncorrectAnswer: faker.lorem.sentence(),
}));

export const ActivityMother = {
    create: (params?: Partial<Activity>): Activity => {
        return ActivityFactory.build(params);
    },
    createList: (length = 5): Activity[] => {
        return ActivityFactory.buildList(length);
    },
    createWithTooShortQuestion: (): Activity => {
        return ActivityFactory.build({
            question: faker.lorem.word(QUESTION_MIN_LENGTH - 1),
        });
    },
    createWithTooLongQuestion: (): Activity => {
        return ActivityFactory.build({
            question: faker.lorem.sentence(QUESTION_MAX_LENGTH + 1),
        });
    },
    createWithTooShortType: (): Activity => {
        return ActivityFactory.build({
            type: faker.lorem.word(TYPE_MIN_LENGTH - 1),
        });
    },
    createWithTooLongType: (): Activity => {
        return ActivityFactory.build({
            type: faker.lorem.sentence(TYPE_MAX_LENGTH + 1),
        });
    },
    createWithTooShortCorrectAnswer: (): Activity => {
        return ActivityFactory.build({
            correctAnswer: faker.lorem.word(CORRECT_ANSWER_MIN_LENGTH - 1),
        });
    },
    createWithTooLongCorrectAnswer: (): Activity => {
        return ActivityFactory.build({
            correctAnswer: faker.lorem.sentence(CORRECT_ANSWER_MAX_LENGTH + 1),
        });
    },
    createWithTooShortFirstIncorrectAnswer: (): Activity => {
        return ActivityFactory.build({
            firstIncorrectAnswer: faker.lorem.word(FIRST_INCORRECT_ANSWER_MIN_LENGTH - 1),
        });
    },
    createWithTooLongFirstIncorrectAnswer: (): Activity => {
        return ActivityFactory.build({
            firstIncorrectAnswer: faker.lorem.sentence(FIRST_INCORRECT_ANSWER_MAX_LENGTH + 1),
        });
    },
    createWithTooShortSecondIncorrectAnswer: (): Activity => {
        return ActivityFactory.build({
            secondIncorrectAnswer: faker.lorem.word(SECOND_INCORRECT_ANSWER_MIN_LENGTH - 1),
        });
    },
    createWithTooLongSecondIncorrectAnswer: (): Activity => {
        return ActivityFactory.build({
            secondIncorrectAnswer: faker.lorem.sentence(SECOND_INCORRECT_ANSWER_MAX_LENGTH + 1),
        });
    },

}