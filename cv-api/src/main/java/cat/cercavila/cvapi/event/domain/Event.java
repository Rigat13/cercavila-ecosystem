package cat.cercavila.cvapi.event.domain;

import java.util.List;
import java.util.UUID;

public class Event {
    private String id;
    private String name;
    private String description;
    private String imageKey;
    private String primaryColour;
    private String secondaryColour;
    private String type;
    private String startDate;
    private String endDate;
    private List<String> cercatrivies;

    private float firstCoinsReward;
    private List<String> firstDigitalProductsReward;
    private float secondCoinsReward;
    private List<String> secondDigitalProductsReward;
    private float thirdCoinsReward;
    private List<String> thirdDigitalProductsReward;
    private float fourthTenthCoinsReward;
    private List<String> fourthTenthDigitalProductsReward;
    private float allCoinsReward;
    private List<String> allDigitalProductsReward;

    public Event() {}

    public Event(String name, String description, String imageKey, String primaryColour, String secondaryColour, String type,
                 String startDate, String endDate, List<String> cercatrivies, float firstCoinsReward, List<String> firstDigitalProductsReward,
                 float secondCoinsReward, List<String> secondDigitalProductsReward, float thirdCoinsReward, List<String> thirdDigitalProductsReward,
                 float fourthTenthCoinsReward, List<String> fourthTenthDigitalProductsReward, float allCoinsReward, List<String> allDigitalProductsReward) {
        this.id = UUID.randomUUID().toString(); // Note: this is correct for not web applications; but as Event can be created from the front, the UUID is assigned between the front and the in port of persistence, and does not get to domain.
        this.name = name;
        this.description = description;
        this.imageKey = imageKey;
        this.primaryColour = primaryColour;
        this.secondaryColour = secondaryColour;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.cercatrivies = cercatrivies;
        this.firstCoinsReward = firstCoinsReward;
        this.firstDigitalProductsReward = firstDigitalProductsReward;
        this.secondCoinsReward = secondCoinsReward;
        this.secondDigitalProductsReward = secondDigitalProductsReward;
        this.thirdCoinsReward = thirdCoinsReward;
        this.thirdDigitalProductsReward = thirdDigitalProductsReward;
        this.fourthTenthCoinsReward = fourthTenthCoinsReward;
        this.fourthTenthDigitalProductsReward = fourthTenthDigitalProductsReward;
        this.allCoinsReward = allCoinsReward;
        this.allDigitalProductsReward = allDigitalProductsReward;
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
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    public List<String> getCercatrivies() { return cercatrivies; }
    public void setCercatrivies(List<String> cercatrivies) { this.cercatrivies = cercatrivies; }
    public float getFirstCoinsReward() { return firstCoinsReward; }
    public void setFirstCoinsReward(float firstCoinsReward) { this.firstCoinsReward = firstCoinsReward; }
    public List<String> getFirstDigitalProductsReward() { return firstDigitalProductsReward; }
    public void setFirstDigitalProductsReward(List<String> firstDigitalProductsReward) { this.firstDigitalProductsReward = firstDigitalProductsReward; }
    public float getSecondCoinsReward() { return secondCoinsReward; }
    public void setSecondCoinsReward(float secondCoinsReward) { this.secondCoinsReward = secondCoinsReward; }
    public List<String> getSecondDigitalProductsReward() { return secondDigitalProductsReward; }
    public void setSecondDigitalProductsReward(List<String> secondDigitalProductsReward) { this.secondDigitalProductsReward = secondDigitalProductsReward; }
    public float getThirdCoinsReward() { return thirdCoinsReward; }
    public void setThirdCoinsReward(float thirdCoinsReward) { this.thirdCoinsReward = thirdCoinsReward; }
    public List<String> getThirdDigitalProductsReward() { return thirdDigitalProductsReward; }
    public void setThirdDigitalProductsReward(List<String> thirdDigitalProductsReward) { this.thirdDigitalProductsReward = thirdDigitalProductsReward; }
    public float getFourthTenthCoinsReward() { return fourthTenthCoinsReward; }
    public void setFourthTenthCoinsReward(float fourthTenthCoinsReward) { this.fourthTenthCoinsReward = fourthTenthCoinsReward; }
    public List<String> getFourthTenthDigitalProductsReward() { return fourthTenthDigitalProductsReward; }
    public void setFourthTenthDigitalProductsReward(List<String> fourthTenthDigitalProductsReward) { this.fourthTenthDigitalProductsReward = fourthTenthDigitalProductsReward; }
    public float getAllCoinsReward() { return allCoinsReward; }
    public void setAllCoinsReward(float allCoinsReward) { this.allCoinsReward = allCoinsReward; }

    @Override
    public String toString() {
        return "Event{" +
                "id='" + id +
                ", name='" + name +
                ", description='" + description +
                ", imageKey='" + imageKey +
                ", primaryColour='" + primaryColour +
                ", secondaryColour='" + secondaryColour +
                ", type='" + type +
                ", startDate='" + startDate +
                ", endDate='" + endDate +
                ", cercatrivies=" + cercatrivies +
                ", firstCoinsReward=" + firstCoinsReward +
                ", firstDigitalProductsReward=" + firstDigitalProductsReward +
                ", secondCoinsReward=" + secondCoinsReward +
                ", secondDigitalProductsReward=" + secondDigitalProductsReward +
                ", thirdCoinsReward=" + thirdCoinsReward +
                ", thirdDigitalProductsReward=" + thirdDigitalProductsReward +
                ", fourthTenthCoinsReward=" + fourthTenthCoinsReward +
                ", fourthTenthDigitalProductsReward=" + fourthTenthDigitalProductsReward +
                ", allCoinsReward=" + allCoinsReward +
                ", allDigitalProductsReward=" + allDigitalProductsReward +
                '}';
    }
}