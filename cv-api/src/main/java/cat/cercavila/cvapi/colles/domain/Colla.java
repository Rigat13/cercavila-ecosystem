package cat.cercavila.cvapi.colles.domain;

import java.util.UUID;

public class Colla {
    private String id;
    private String name;
    private String entity;
    private int foundationYear;
    private String description;

    public Colla() {}

    public Colla(String name, String entity, int foundationYear, String description) {
        this.id = UUID.randomUUID().toString(); // TODO: Note: this is correct for not web applications; but as Colles can be created from the front, the UUID is assigned between the front and the in port of persistence, and does not get to domain.
        this.name = name;
        this.entity = entity;
        this.foundationYear = foundationYear;
        this.description = description;
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
    @Override
    public String toString() {
        return "Colla{" +
                "id='" + id +
                ", name='" + name +
                ", entity='" + entity +
                ", foundationYear=" + foundationYear +
                ", description='" + description +
                '}';
    }
}