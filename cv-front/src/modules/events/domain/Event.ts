import { EventIdNotValidError, isEventIdValid } from "@/modules/events/domain/events-attributes/EventId";
import { EventImageNotValidError, isEventImageValid } from "@/modules/events/domain/events-attributes/EventImage";
import { EventTypeNotValidError, isEventTypeValid } from "@/modules/events/domain/events-attributes/EventType";
import { EventDescriptionNotValidError, isEventDescriptionValid } from "@/modules/events/domain/events-attributes/EventDescription";
import { EventNameNotValidError, isEventNameValid } from "@/modules/events/domain/events-attributes/EventName";
import { EventColourNotValidError, isEventColourValid } from "@/modules/events/domain/events-attributes/EventColours";
import {EventStartDateNotValidError, isEventStartDateValid} from "@/modules/events/domain/digitalproducts-attributes/EventStartDate";
import {EventEndDateNotValidError, isEventEndDateValid} from "@/modules/events/domain/digitalproducts-attributes/EventEndDate";
import {EventFirstCoinsRewardNotValidError, isEventFirstCoinsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventFirstCoinsReward";
import {EventCercatriviesNotValidError, isEventCercatriviesValid} from "@/modules/events/domain/digitalproducts-attributes/EventCercatrivies";
import {EventThirdCoinsRewardNotValidError, isEventThirdCoinsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventThirdCoinsReward";
import {EventFourthTenthCoinsRewardNotValidError, isEventFourthTenthCoinsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventFourthTenthCoinsReward";
import {EventSecondCoinsRewardNotValidError, isEventSecondCoinsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventSecondCoinsReward";
import {EventAllCoinsRewardNotValidError, isEventAllCoinsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventAllCoinsReward";
import {EventFirstDigitalProductsRewardNotValidError, isEventFirstDigitalProductsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventFirstDigitalProductsReward";
import {EventSecondDigitalProductsRewardNotValidError, isEventSecondDigitalProductsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventSecondDigitalProductsReward";
import {EventThirdDigitalProductsRewardNotValidError, isEventThirdDigitalProductsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventThirdDigitalProductsReward";
import {EventAllDigitalProductsRewardNotValidError, isEventAllDigitalProductsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventAllDigitalProductsReward";
import {EventFourthTenthDigitalProductsRewardNotValidError, isEventFourthTenthDigitalProductsRewardValid} from "@/modules/events/domain/digitalproducts-attributes/EventFourthTenthDigitalProductsReward";

export interface Event {
    id: string;
    name: string;
    description: string;
    image: File | null;
    primaryColour: string;
    secondaryColour: string;
    type: string;
    startDate: string;
    endDate: string;
    cercatrivies: string[];
    firstCoinsReward: number;
    firstDigitalProductsReward: string[];
    secondCoinsReward: number;
    secondDigitalProductsReward: string[];
    thirdCoinsReward: number;
    thirdDigitalProductsReward: string[];
    fourthTenthCoinsReward: number;
    fourthTenthDigitalProductsReward: string[];
    allCoinsReward: number;
    allDigitalProductsReward: string[];
}

export function ensureEventIsValid({id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
                                       firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                                       thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                                       allCoinsReward, allDigitalProductsReward}: Event): void {
    if (!isEventIdValid(id)) { throw EventIdNotValidError(id); }
    ensureEventIsValidEmptyId({id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
                                firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                                thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                                allCoinsReward, allDigitalProductsReward});
}

export function ensureEventIsValidEmptyId({id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
                                              firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                                              thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                                              allCoinsReward, allDigitalProductsReward}: Event): void {
    if (!isEventIdValid(id)) { throw EventIdNotValidError(id); }
    if (!isEventNameValid(name)) { throw EventNameNotValidError(name); }
    if (!isEventDescriptionValid(description)) { throw EventDescriptionNotValidError(description); }
    if (!isEventImageValid(image)) { throw EventImageNotValidError(image); }
    if (!isEventColourValid(primaryColour)) { throw EventColourNotValidError(primaryColour); }
    if (!isEventColourValid(secondaryColour)) { throw EventColourNotValidError(secondaryColour); }
    if (!isEventTypeValid(type, "")) { throw EventTypeNotValidError(type); }
    if (!isEventStartDateValid(startDate)) { throw EventStartDateNotValidError(startDate); }
    if (!isEventEndDateValid(endDate)) { throw EventEndDateNotValidError(endDate); }
    if (!isEventCercatriviesValid(cercatrivies.toString())) { throw EventCercatriviesNotValidError(cercatrivies.toString()); }
    if (!isEventFirstCoinsRewardValid(firstCoinsReward)) { throw EventFirstCoinsRewardNotValidError(firstCoinsReward); }
    if (!isEventFirstDigitalProductsRewardValid(firstDigitalProductsReward.toString())) { throw EventFirstDigitalProductsRewardNotValidError(firstDigitalProductsReward.toString()); }
    if (!isEventSecondCoinsRewardValid(secondCoinsReward)) { throw EventSecondCoinsRewardNotValidError(secondCoinsReward); }
    if (!isEventSecondDigitalProductsRewardValid(secondDigitalProductsReward.toString())) { throw EventSecondDigitalProductsRewardNotValidError(secondDigitalProductsReward.toString()); }
    if (!isEventThirdCoinsRewardValid(thirdCoinsReward)) { throw EventThirdCoinsRewardNotValidError(thirdCoinsReward); }
    if (!isEventThirdDigitalProductsRewardValid(thirdDigitalProductsReward.toString())) { throw EventThirdDigitalProductsRewardNotValidError(thirdDigitalProductsReward.toString()); }
    if (!isEventFourthTenthCoinsRewardValid(fourthTenthCoinsReward)) { throw EventFourthTenthCoinsRewardNotValidError(fourthTenthCoinsReward); }
    if (!isEventFourthTenthDigitalProductsRewardValid(fourthTenthDigitalProductsReward.toString())) { throw EventFourthTenthDigitalProductsRewardNotValidError(fourthTenthDigitalProductsReward).toString(); }
    if (!isEventAllCoinsRewardValid(allCoinsReward)) { throw EventAllCoinsRewardNotValidError(allCoinsReward); }
    if (!isEventAllDigitalProductsRewardValid(allDigitalProductsReward.toString())) { throw EventAllDigitalProductsRewardNotValidError(allDigitalProductsReward.toString()); }
}

export function ensureEventIdIsValid(id: string): void {
    if (!isEventIdValid(id)) {
        throw EventIdNotValidError(id);
    }
}