import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductName";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";

const DigitalProductFactory = Factory.define<DigitalProduct>(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    image: null,
    primaryColour: faker.internet.color(),
    secondaryColour: faker.internet.color(),
    price: faker.datatype.number(),
    type: faker.lorem.word(),
}));

export const DigitalProductMother = {
    create: (params?: Partial<DigitalProduct>): DigitalProduct => {
        return DigitalProductFactory.build(params);
    },
    createList: (length = 5): DigitalProduct[] => {
        return DigitalProductFactory.buildList(length);
    },
    createWithTooShortName: (): DigitalProduct => {
        return DigitalProductFactory.build({
            name: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongName: (): DigitalProduct => {
        return DigitalProductFactory.build({
            name: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
    createWithTooShortType: (): DigitalProduct => {
        return DigitalProductFactory.build({
            type: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongType: (): DigitalProduct => {
        return DigitalProductFactory.build({
            type: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
    createWithTooLowPrice: (): DigitalProduct => {
        return DigitalProductFactory.build({
            price: -1,
        });
    },
    createWithTooShortDescription: (): DigitalProduct => {
        return DigitalProductFactory.build({
            description: faker.lorem.word(NAME_MIN_LENGTH - 1),
        });
    },
    createWithTooLongDescription: (): DigitalProduct => {
        return DigitalProductFactory.build({
            description: faker.lorem.sentence(NAME_MAX_LENGTH + 1),
        });
    },
}