package cat.cercavila.cvapi.digitalproducts.adapter.out.persistence;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "digitalProduct")
public class DigitalProductEntity {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private String name;
    private String description;
    private String imageKey;
    private String primaryColour;
    private String secondaryColour;
    private float price;
    private String type;

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
    public void setPrice(float price) { this.price = price; }
    public float getPrice() { return price; }
    public void setType(String type) { this.type = type; }
    public String getType() { return type; }
}
