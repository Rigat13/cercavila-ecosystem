package cat.cercavila.cvapi.events.adapter.out.persistence;

import cat.cercavila.cvapi.events.domain.Event;
import cat.cercavila.cvapi.events.application.port.in.list.EventListing;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class MapperEventEventEntity {
    public static Event eventEntityToEvent(EventEntity eventEntity) {
        List<String> cercatrivies = stringToListString(eventEntity.getCercatrivies());
        List<String> firstDigitalProductsReward = stringToListString(eventEntity.getFirstDigitalProductsReward());
        List<String> secondDigitalProductsReward = stringToListString(eventEntity.getSecondDigitalProductsReward());
        List<String> thirdDigitalProductsReward = stringToListString(eventEntity.getThirdDigitalProductsReward());
        List<String> fourthTenthDigitalProductsReward = stringToListString(eventEntity.getFourthTenthDigitalProductsReward());
        List<String> allDigitalProductsReward = stringToListString(eventEntity.getAllDigitalProductsReward());

        Event event = new Event(eventEntity.getName(), eventEntity.getDescription(), eventEntity.getImageKey(), eventEntity.getPrimaryColour(), eventEntity.getSecondaryColour(),
                eventEntity.getType(), eventEntity.getStartDate(), eventEntity.getEndDate(),cercatrivies, eventEntity.getFirstCoinsReward(), firstDigitalProductsReward,
                eventEntity.getSecondCoinsReward(), secondDigitalProductsReward, eventEntity.getThirdCoinsReward(), thirdDigitalProductsReward,
                eventEntity.getFourthTenthCoinsReward(), fourthTenthDigitalProductsReward, eventEntity.getAllCoinsReward(), allDigitalProductsReward);
        // NOTE: Created from zero, with new ID.
        return event;
    }

    public static EventEntity eventToEventEntity(Event event) {
        String cercatrivies = listStringToString(event.getCercatrivies());
        String firstDigitalProductsReward = listStringToString(event.getFirstDigitalProductsReward());
        String secondDigitalProductsReward = listStringToString(event.getSecondDigitalProductsReward());
        String thirdDigitalProductsReward = listStringToString(event.getThirdDigitalProductsReward());
        String fourthTenthDigitalProductsReward = listStringToString(event.getFourthTenthDigitalProductsReward());
        String allDigitalProductsReward = listStringToString(event.getAllDigitalProductsReward());

        EventEntity eventEntity = new EventEntity();
        eventEntity.setId(event.getId());
        eventEntity.setName(event.getName());
        eventEntity.setDescription(event.getDescription());
        eventEntity.setImageKey(event.getImageKey());
        eventEntity.setPrimaryColour(event.getPrimaryColour());
        eventEntity.setSecondaryColour(event.getSecondaryColour());
        eventEntity.setType(event.getType());
        eventEntity.setStartDate(eventEntity.getStartDate());
        eventEntity.setEndDate(eventEntity.getEndDate());
        eventEntity.setCercatrivies(eventEntity.getCercatrivies());
        eventEntity.setFirstCoinsReward(eventEntity.getFirstCoinsReward());
        eventEntity.setFirstDigitalProductsReward(eventEntity.getFirstDigitalProductsReward());
        eventEntity.setSecondCoinsReward(eventEntity.getSecondCoinsReward());
        eventEntity.setSecondDigitalProductsReward(eventEntity.getSecondDigitalProductsReward());
        eventEntity.setThirdCoinsReward(eventEntity.getThirdCoinsReward());
        eventEntity.setThirdDigitalProductsReward(eventEntity.getThirdDigitalProductsReward());
        eventEntity.setFourthTenthCoinsReward(eventEntity.getFourthTenthCoinsReward());
        eventEntity.setFourthTenthDigitalProductsReward(eventEntity.getFourthTenthDigitalProductsReward());
        eventEntity.setAllCoinsReward(eventEntity.getAllCoinsReward());
        eventEntity.setAllDigitalProductsReward(eventEntity.getAllDigitalProductsReward());

        return eventEntity;
    }

    public static EventEntity eventListingToEventEntity(EventListing currentEventListing) {
        EventEntity eventEntity = new EventEntity();
        eventEntity.setId(currentEventListing.id());
        eventEntity.setName(currentEventListing.name());
        eventEntity.setDescription(currentEventListing.description());
        eventEntity.setImageKey(currentEventListing.imageKey());
        eventEntity.setPrimaryColour(currentEventListing.primaryColour());
        eventEntity.setSecondaryColour(currentEventListing.secondaryColour());
        eventEntity.setType(currentEventListing.type());
        eventEntity.setStartDate(currentEventListing.startDate());
        eventEntity.setEndDate(currentEventListing.endDate());
        eventEntity.setCercatrivies(currentEventListing.cercatrivies());
        eventEntity.setFirstCoinsReward(currentEventListing.firstCoinsReward());
        eventEntity.setFirstDigitalProductsReward(currentEventListing.firstDigitalProductsReward());
        eventEntity.setSecondCoinsReward(currentEventListing.secondCoinsReward());
        eventEntity.setSecondDigitalProductsReward(currentEventListing.secondDigitalProductsReward());
        eventEntity.setThirdCoinsReward(currentEventListing.thirdCoinsReward());
        eventEntity.setThirdDigitalProductsReward(currentEventListing.thirdDigitalProductsReward());
        eventEntity.setFourthTenthCoinsReward(currentEventListing.fourthTenthCoinsReward());
        eventEntity.setFourthTenthDigitalProductsReward(currentEventListing.fourthTenthDigitalProductsReward());
        eventEntity.setAllCoinsReward(currentEventListing.allCoinsReward());
        eventEntity.setAllDigitalProductsReward(currentEventListing.allDigitalProductsReward());

        return eventEntity;
    }

    private static String listStringToString(List<String> list) { return list.stream().collect(Collectors.joining(",")); }
    private static List<String> stringToListString(String string) {
        return Arrays.asList(string.split(","));
    }
}
