package cat.cercavila.cvapi.colles.application.port.in.list;

import org.springframework.web.multipart.MultipartFile;

public record CollaListing(String id, String name, String entity, int foundationYear, String description, String type, String neighbourhood, String logoKey) {}