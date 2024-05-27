package cat.cercavila.cvapi.events.application.port.in.list;

public record EventListing(String id, String name, String description, String imageKey, byte[] image, String primaryColour, String secondaryColour, String type,
                           String startDate, String endDate, String cercatrivies, float firstCoinsReward, String firstDigitalProductsReward,
                           float secondCoinsReward, String secondDigitalProductsReward, float thirdCoinsReward, String thirdDigitalProductsReward,
                           float fourthTenthCoinsReward, String fourthTenthDigitalProductsReward, float allCoinsReward, String allDigitalProductsReward) {

    public EventListing(String id, String name, String description, String imageKey, String primaryColour, String secondaryColour, String type,
                        String startDate, String endDate, String cercatrivies, float firstCoinsReward, String firstDigitalProductsReward,
                        float secondCoinsReward, String secondDigitalProductsReward, float thirdCoinsReward, String thirdDigitalProductsReward,
                        float fourthTenthCoinsReward, String fourthTenthDigitalProductsReward, float allCoinsReward, String allDigitalProductsReward) {

        this(id, name, description, imageKey, null, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies, firstCoinsReward, firstDigitalProductsReward,
             secondCoinsReward, secondDigitalProductsReward, thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward, allCoinsReward, allDigitalProductsReward);
    }
}
