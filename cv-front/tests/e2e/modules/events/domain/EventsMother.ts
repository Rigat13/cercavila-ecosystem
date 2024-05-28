import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from "@/modules/events/domain/events-attributes/EventName";
import {Event} from "@/modules/events/domain/Event";

const EventFactory = Factory.define<Event>(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    image: null,
    primaryColour: faker.internet.color(),
    secondaryColour: faker.internet.color(),
    type: faker.lorem.word(),
    startDate: faker.date.recent().toISOString(),
    endDate: faker.date.future().toISOString(),
    cercatrivies: [faker.lorem.word()],
    firstCoinsReward: faker.datatype.number(),
    firstDigitalProductsReward: [faker.lorem.word()],
    secondCoinsReward: faker.datatype.number(),
    secondDigitalProductsReward: [faker.lorem.word()],
    thirdCoinsReward: faker.datatype.number(),
    thirdDigitalProductsReward: [faker.lorem.word()],
    fourthTenthCoinsReward: faker.datatype.number(),
    fourthTenthDigitalProductsReward: [faker.lorem.word()],
    allCoinsReward: faker.datatype.number(),
    allDigitalProductsReward: [faker.lorem.word()],
}));

export const EventMother = {
    create: (params?: Partial<Event>): Event => {
        return EventFactory.build(params);
    },
    createList: (length = 5): Event[] => {
        return EventFactory.buildList(length);
    },
    createWithTooShortName: (): Event => {
        return EventFactory.build({
            name: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongName: (): Event => {
        return EventFactory.build({
            name: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
    createWithTooShortType: (): Event => {
        return EventFactory.build({
            type: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongType: (): Event => {
        return EventFactory.build({
            type: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
    createWithTooShortDescription: (): Event => {
        return EventFactory.build({
            description: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongDescription: (): Event => {
        return EventFactory.build({
            description: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
}