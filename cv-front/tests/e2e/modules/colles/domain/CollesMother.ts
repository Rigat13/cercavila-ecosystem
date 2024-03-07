import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from "@/modules/colles/domain/colla-attributes/CollaName";
import { ENTITY_MIN_LENGTH, ENTITY_MAX_LENGTH } from "@/modules/colles/domain/colla-attributes/CollaEntity";
import { FOUNDATION_YEAR_MIN, FOUNDATION_YEAR_MAX } from "@/modules/colles/domain/colla-attributes/CollaFoundationYear";
import {Colla} from "@/modules/colles/domain/Colla";

const CollaFactory = Factory.define<Colla>(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.sentence(),
    entity: faker.lorem.sentence(),
    foundationYear: faker.number.int(),
}));

export const CollaMother = {
    create: (params?: Partial<Colla>): Colla => {
        return CollaFactory.build(params);
    },
    createList: (length = 5): Colla[] => {
        return CollaFactory.buildList(length);
    },
    createWithTooShortName: (): Colla => {
        return CollaFactory.build({
            name: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongName: (): Colla => {
        return CollaFactory.build({
            name: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
    createWithTooShortEntity: (): Colla => {
        return CollaFactory.build({
            entity: faker.lorem.word(ENTITY_MIN_LENGTH - 1),
        });
    },
    createWithTooLongEntity: (): Colla => {
        return CollaFactory.build({
            entity: faker.lorem.sentence(ENTITY_MAX_LENGTH + 1),
        });
    },
    createWithTooSmallFoundationYear: (): Colla => {
        return CollaFactory.build({
            foundationYear: FOUNDATION_YEAR_MIN - 1,
        });
    },
    createWithTooBigFoundationYear: (): Colla => {
        return CollaFactory.build({
            foundationYear: FOUNDATION_YEAR_MAX + 1,
        });
    }
}