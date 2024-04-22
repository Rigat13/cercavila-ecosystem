package cat.cercavila.cvapi.colles.application.port.in.list;

public record CollaListing(String id, String name, String entity, int foundationYear, String description, String type, String neighbourhood,
                           String primaryColour, String secondaryColour, String logoKey, byte[] logo, String music, String email, String instagram) {
    public CollaListing(String id, String name, String entity, int foundationYear, String description, String type, String neighbourhood,
                        String primaryColour, String secondaryColour, String logoKey, String music, String email, String instagram) {
        this(id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, logoKey, null, music, email, instagram);
    }
}
