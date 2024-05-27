package cat.cercavila.cvapi.event.application.port.in.list;

public record EventListing(String id, String name, String description, String imageKey, byte[] image, String primaryColour, String secondaryColour, float price, String type) {
    public EventListing(String id, String name, String description, String imageKey, String primaryColour, String secondaryColour, float price, String type) {
        this(id, name, description, imageKey, null, primaryColour, secondaryColour, price, type);
    }
}
