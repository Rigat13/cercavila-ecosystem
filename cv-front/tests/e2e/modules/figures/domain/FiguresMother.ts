import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from "@/modules/figures/domain/figura-attributes/FiguraName";
import { YEAR_MIN, YEAR_MAX } from "@/modules/figures/domain/figura-attributes/FiguraYear";
import {Figura} from "@/modules/figures/domain/Figura";

const FiguraFactory = Factory.define<Figura>(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.sentence(),
    year: faker.number.int(),
    type: faker.lorem.sentence(),
    image: null,
    webUrl: faker.internet.url(),
}));

export const FiguraMother = {
    create: (params?: Partial<Figura>): Figura => {
        return FiguraFactory.build(params);
    },
    createList: (length = 5): Figura[] => {
        return FiguraFactory.buildList(length);
    },
    createWithTooShortName: (): Figura => {
        return FiguraFactory.build({
            name: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongName: (): Figura => {
        return FiguraFactory.build({
            name: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
    createWithTooSmallYear: (): Figura => {
        return FiguraFactory.build({
            year: YEAR_MIN - 1,
        });
    },
    createWithTooBigYear: (): Figura => {
        return FiguraFactory.build({
            year: YEAR_MAX + 1,
        });
    },
    createWithTooShortType: (): Figura => {
        return FiguraFactory.build({
            type: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongType: (): Figura => {
        return FiguraFactory.build({
            type: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
    createWithTooShortWebUrl: (): Figura => {
        return FiguraFactory.build({
            webUrl: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongWebUrl: (): Figura => {
        return FiguraFactory.build({
            webUrl: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    }
}