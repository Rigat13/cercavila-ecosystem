package cat.cercavila.cvapi.digitalProducts.application.port.in.list;

public record FiguraListing(String id, String name, int year, String type, String imageKey, byte[] image, String webUrl) {
    public FiguraListing(String id, String name, int year, String type, String imageKey, String webUrl) {
        this(id, name, year, type, imageKey, null, webUrl);
    }
}
