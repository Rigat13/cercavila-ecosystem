package cat.cercavila.cvapi.digitalProducts.domain;

import java.util.UUID;

public class DigitalProducts {
    private String id;
    private String name;
    private String description;
    private String imageKey;
    private String primaryColour;
    private String secondaryColour;
    private float price;
    private String type;

    public DigitalProducts() {}

    public DigitalProducts(String name, String description, String imageKey, String primaryColour, String secondaryColour, float price, String type) {
        this.id = UUID.randomUUID().toString(); // TODO: Note: this is correct for not web applications; but as DigitalProducts can be created from the front, the UUID is assigned between the front and the in port of persistence, and does not get to domain.
        this.name = name;
        this.description = description;
        this.imageKey = imageKey;
        this.primaryColour = primaryColour;
        this.secondaryColour = secondaryColour;
        this.price = price;
        this.type = type;
    }

    public String getId() { return id; }
    public String getName() {return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageKey() { return imageKey; }
    public void setImageKey(String imageKey) { this.imageKey = imageKey; }
    public String getPrimaryColour() { return primaryColour; }
    public void setPrimaryColour(String primaryColour) { this.primaryColour = primaryColour; }
    public String getSecondaryColour() { return secondaryColour; }
    public void setSecondaryColour(String secondaryColour) { this.secondaryColour = secondaryColour; }
    public float getPrice() { return price; }
    public void setPrice(float price) { this.price = price; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    @Override
    public String toString() {
        return "DigitalProducts{" +
                "id='" + id +
                ", name='" + name +
                ", description='" + description +
                ", imageKey='" + imageKey +
                ", primaryColour='" + primaryColour +
                ", secondaryColour='" + secondaryColour +
                ", price=" + price +
                ", type='" + type +
                '}';
    }
}