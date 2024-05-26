package cat.cercavila.cvapi.activities.application.port.in.list;

public record ActivityListing(String id, String name, int year, String type, String imageKey, byte[] image, String webUrl) {
    public ActivityListing(String id, String name, int year, String type, String imageKey, String webUrl) {
        this(id, name, year, type, imageKey, null, webUrl);
    }
}
