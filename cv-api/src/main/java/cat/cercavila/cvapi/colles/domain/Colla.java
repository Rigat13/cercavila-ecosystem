package cat.cercavila.cvapi.colles.domain;

import java.util.UUID;

public class Colla {
    private String id;
    private String name;
    private String entity;
    private int foundationYear;
    private String description;
    private String type;
    private String neighbourhood;
    private String primaryColour;
    private String secondaryColour;
    private String logoKey;

    public Colla() {}

    public Colla(String name, String entity, int foundationYear, String description, String type, String neighbourhood, String primaryColour, String secondaryColour, String logoKey) {
        this.id = UUID.randomUUID().toString(); // TODO: Note: this is correct for not web applications; but as Colles can be created from the front, the UUID is assigned between the front and the in port of persistence, and does not get to domain.
        this.name = name;
        this.entity = entity;
        this.foundationYear = foundationYear;
        this.description = description;
        this.type = type;
        this.neighbourhood = neighbourhood;
        this.primaryColour = primaryColour;
        this.secondaryColour = secondaryColour;
        this.logoKey = logoKey;
    }

    public String getId() { return id; }
    public String getName() {return name; }
    public void setName(String name) { this.name = name; }
    public String getEntity() { return entity; }
    public void setEntity(String entity) { this.entity = entity; }
    public int getFoundationYear() { return foundationYear; }
    public void setFoundationYear(int foundationYear) { this.foundationYear = foundationYear; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getNeighbourhood() { return neighbourhood; }
    public void setNeighbourhood(String neighbourhood) { this.neighbourhood = neighbourhood; }
    public String getPrimaryColour() { return primaryColour; }
    public void setPrimaryColour(String primaryColour) { this.primaryColour = primaryColour; }
    public String getSecondaryColour() { return secondaryColour; }
    public void setSecondaryColour(String secondaryColour) { this.secondaryColour = secondaryColour; }
    public String getLogoKey() { return logoKey; }
    public void setLogoKey(String logoKey) { this.logoKey = logoKey; }

    @Override
    public String toString() {
        return "Colla{" +
                "id='" + id +
                ", name='" + name +
                ", entity='" + entity +
                ", foundationYear=" + foundationYear +
                ", description='" + description +
                ", type='" + type +
                ", neighbourhood='" + neighbourhood +
                ", primaryColour='" + primaryColour +
                ", secondaryColour='" + secondaryColour +
                ", logoKey='" + logoKey +
                '}';
    }
}