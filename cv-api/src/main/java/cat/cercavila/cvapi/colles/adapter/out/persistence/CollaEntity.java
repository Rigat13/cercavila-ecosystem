package cat.cercavila.cvapi.colles.adapter.out.persistence;

import javax.persistence.Entity;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "colla")
public class CollaEntity {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private String name;
    private String entity;
    private int foundationYear;

    public void setId(String id) { this.id = id; }
    public String getId() { return id; }

    public String getName() {return name; }
    public void setName(String name) { this.name = name; }
    public String getEntity() { return entity; }
    public void setEntity(String entity) { this.entity = entity; }
    public int getFoundationYear() { return foundationYear; }
    public void setFoundationYear(int foundationYear) { this.foundationYear = foundationYear; }
}
