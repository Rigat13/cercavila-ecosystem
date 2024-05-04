package cat.cercavila.cvapi.digitalProducts.domain;

import java.util.UUID;

public class Figura {
    private String id;
    private String name;
    private int year;
    private String type;
    private String imageKey;
    private String webUrl;

    public Figura() {}

    public Figura(String name, int year, String type, String imageKey, String webUrl) {
        this.id = UUID.randomUUID().toString(); // TODO: Note: this is correct for not web applications; but as Figures can be created from the front, the UUID is assigned between the front and the in port of persistence, and does not get to domain.
        this.name = name;
        this.year = year;
        this.type = type;
        this.imageKey = imageKey;
        this.webUrl = webUrl;
    }

    public String getId() { return id; }
    public String getName() {return name; }
    public void setName(String name) { this.name = name; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getImageKey() { return imageKey; }
    public void setImageKey(String imageKey) { this.imageKey = imageKey; }
    public String getWebUrl() { return webUrl; }
    public void setWebUrl(String webUrl) { this.webUrl = webUrl; }

    @Override
    public String toString() {
        return "Figura{" +
                "id='" + id +
                ", name='" + name +
                ", year=" + year +
                ", type='" + type +
                ", imageKey='" + imageKey +
                ", webUrl='" + webUrl +
                '}';
    }
}