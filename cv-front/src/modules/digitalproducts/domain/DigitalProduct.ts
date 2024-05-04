import { DigitalProductIdNotValidError, isDigitalProductIdValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductId";
import { DigitalProductImageNotValidError, isDigitalProductImageValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductImage";
import { DigitalProductTypeNotValidError, isDigitalProductTypeValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductType";
import { DigitalProductDescriptionNotValidError, isDigitalProductDescriptionValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductDescription";
import { DigitalProductNameNotValidError, isDigitalProductNameValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductName";
import { DigitalProductColourNotValidError, isDigitalProductColourValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductColours";
import { DigitalProductPriceNotValidError, isDigitalProductPriceValid } from "@/modules/digitalproducts/domain/digitalproducts-attributes/DigitalProductPrice";

export interface DigitalProduct {
    id: string;
    name: string;
    description: string;
    image: File | null;
    primaryColour: string;
    secondaryColour: string;
    price: number;
    type: string;
}

export function ensureDigitalProductIsValid({id, name, description, image, primaryColour, secondaryColour, price, type}: DigitalProduct): void {
    if (!isDigitalProductIdValid(id)) { throw DigitalProductIdNotValidError(id); }
    ensureDigitalProductIsValidEmptyId({id, name, description, image, primaryColour, secondaryColour, price, type});
}

export function ensureDigitalProductIsValidEmptyId({id, name, description, image, primaryColour, secondaryColour, price, type}: DigitalProduct): void {
    if (!isDigitalProductNameValid(name)) { throw DigitalProductNameNotValidError(name); }
    if (!isDigitalProductDescriptionValid(description)) { throw DigitalProductDescriptionNotValidError(description); }
    if (!isDigitalProductImageValid(image)) { throw DigitalProductImageNotValidError(image); }
    if (!isDigitalProductColourValid(primaryColour)) { throw DigitalProductColourNotValidError(primaryColour); }
    if (!isDigitalProductColourValid(secondaryColour)) { throw DigitalProductColourNotValidError(secondaryColour); }
    if (!isDigitalProductPriceValid(price)) { throw DigitalProductPriceNotValidError(price); }
    if (!isDigitalProductTypeValid(type, "")) { throw DigitalProductTypeNotValidError(type); }
}

export function ensureDigitalProductIdIsValid(id: string): void {
    if (!isDigitalProductIdValid(id)) {
        throw DigitalProductIdNotValidError(id);
    }
}