package cat.cercavila.cvapi.events.adapter.out.persistence;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "event")
@Table(name = "digital_products")
public class EventEntity {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private String name;
    private String description;
    private String imageKey;
    private String primaryColour;
    private String secondaryColour;
    private String type;
    private String startDate;
    private String endDate;
    private String cercatrivies;

    private float firstCoinsReward;
    private String firstDigitalProductsReward;
    private float secondCoinsReward;
    private String secondDigitalProductsReward;
    private float thirdCoinsReward;
    private String thirdDigitalProductsReward;
    private float fourthTenthCoinsReward;
    private String fourthTenthDigitalProductsReward;
    private float allCoinsReward;
    private String allDigitalProductsReward;

    public void setId(String id) { this.id = id; }
    public String getId() { return id; }

    public String getName() {return name; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public String getDescription() { return description; }
    public void setImageKey(String imageKey) { this.imageKey = imageKey; }
    public String getImageKey() { return imageKey; }
    public void setPrimaryColour(String primaryColour) { this.primaryColour = primaryColour; }
    public String getPrimaryColour() { return primaryColour; }
    public void setSecondaryColour(String secondaryColour) { this.secondaryColour = secondaryColour; }
    public String getSecondaryColour() { return secondaryColour; }
    public void setType(String type) { this.type = type; }
    public String getType() { return type; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public String getStartDate() { return startDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    public String getEndDate() { return endDate; }
    public void setCercatrivies(String cercatrivies) { this.cercatrivies = cercatrivies; }
    public String getCercatrivies() { return cercatrivies; }
    public void setFirstCoinsReward(float firstCoinsReward) { this.firstCoinsReward = firstCoinsReward; }
    public float getFirstCoinsReward() { return firstCoinsReward; }
    public void setFirstDigitalProductsReward(String firstDigitalProductsReward) { this.firstDigitalProductsReward = firstDigitalProductsReward; }
    public String getFirstDigitalProductsReward() { return firstDigitalProductsReward; }
    public void setSecondCoinsReward(float secondCoinsReward) { this.secondCoinsReward = secondCoinsReward; }
    public float getSecondCoinsReward() { return secondCoinsReward; }
    public void setSecondDigitalProductsReward(String secondDigitalProductsReward) { this.secondDigitalProductsReward = secondDigitalProductsReward; }
    public String getSecondDigitalProductsReward() { return secondDigitalProductsReward; }
    public void setThirdCoinsReward(float thirdCoinsReward) { this.thirdCoinsReward = thirdCoinsReward; }
    public float getThirdCoinsReward() { return thirdCoinsReward; }
    public void setThirdDigitalProductsReward(String thirdDigitalProductsReward) { this.thirdDigitalProductsReward = thirdDigitalProductsReward; }
    public String getThirdDigitalProductsReward() { return thirdDigitalProductsReward; }
    public void setFourthTenthCoinsReward(float fourthTenthCoinsReward) { this.fourthTenthCoinsReward = fourthTenthCoinsReward; }
    public float getFourthTenthCoinsReward() { return fourthTenthCoinsReward; }
    public void setFourthTenthDigitalProductsReward(String fourthTenthDigitalProductsReward) { this.fourthTenthDigitalProductsReward = fourthTenthDigitalProductsReward; }
    public String getFourthTenthDigitalProductsReward() { return fourthTenthDigitalProductsReward; }
    public void setAllCoinsReward(float allCoinsReward) { this.allCoinsReward = allCoinsReward; }
    public float getAllCoinsReward() { return allCoinsReward; }
    public void setAllDigitalProductsReward(String allDigitalProductsReward) { this.allDigitalProductsReward = allDigitalProductsReward; }
    public String getAllDigitalProductsReward() { return allDigitalProductsReward; }

}
