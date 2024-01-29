package cat.cercavila.cvapi.colles.domain;

import java.util.UUID;

public class Colla {
    private String id;
    private String name;
    private String entity;
    private int foundationYear;

    public Colla() {}

    public Colla(String name, String entity, int foundationYear) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.entity = entity;
        this.foundationYear = foundationYear;
    }

    public String getId() { return id; }
    public String getName() {return name; }
    public void setName(String name) { this.name = name; }
    public String getEntity() { return entity; }
    public void setEntity(String entity) { this.entity = entity; }
    public int getFoundationYear() { return foundationYear; }
    public void setFoundationYear(int foundationYear) { this.foundationYear = foundationYear; }

    @Override
    public String toString() {
        return "Colla{" +
                "id='" + id +
                ", name='" + name +
                ", entity='" + entity +
                ", foundationYear=" + foundationYear +
                '}';
    }
}