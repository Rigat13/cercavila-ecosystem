package cat.cercavila.cvapi.digitalProducts.application.port.in.list;

public record DigitalProductListing(String id, String name, String description, String imageKey, byte[] image, String primaryColour, String secondaryColour, float price, String type) {
    public DigitalProductListing(String id, String name, String description, String imageKey, String primaryColour, String secondaryColour, float price, String type) {
        this(id, name, description, imageKey, null, primaryColour, secondaryColour, price, type);
    }
}
