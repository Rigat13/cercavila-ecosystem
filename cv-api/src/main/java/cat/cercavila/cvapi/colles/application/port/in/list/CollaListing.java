package cat.cercavila.cvapi.colles.application.port.in.list;

import org.springframework.web.multipart.MultipartFile;

public record CollaListing(String id, String name, String entity, int foundationYear, String description, String type, String neighbourhood, String logoKey, byte[] logo) {
    public CollaListing(String id, String name, String entity, int foundationYear, String description, String type, String neighbourhood, String logoKey) {
        this(id, name, entity, foundationYear, description, type, neighbourhood, logoKey, null);
    }
}