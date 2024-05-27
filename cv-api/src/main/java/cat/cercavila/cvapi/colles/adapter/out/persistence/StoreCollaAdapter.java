package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.StoreCollaPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class StoreCollaAdapter implements StoreCollaPort {
    private final CollaRepository collaRepository;

    public StoreCollaAdapter(CollaRepository collaRepository) { this.collaRepository = collaRepository; }

    @Override
    public void storeColla(CreateCollaCommand createCollaCommand) {
        String logoKeyName = generateLogoKeyName(createCollaCommand);
        if (!logoKeyName.equals("")) saveImageToServer(createCollaCommand.logo(), logoKeyName);
        collaRepository.save(createCollaCommand2CollaEntity(createCollaCommand, logoKeyName));
    }

    private CollaEntity createCollaCommand2CollaEntity(CreateCollaCommand createCollaCommand, String logoKey) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new Colla without an ID
        collaEntity.setName(createCollaCommand.name());
        collaEntity.setEntity(createCollaCommand.entity());
        collaEntity.setFoundationYear(createCollaCommand.foundationYear());
        collaEntity.setDescription(createCollaCommand.description());
        collaEntity.setType(createCollaCommand.type());
        collaEntity.setNeighbourhood(createCollaCommand.neighbourhood());
        collaEntity.setPrimaryColour(createCollaCommand.primaryColour());
        collaEntity.setSecondaryColour(createCollaCommand.secondaryColour());
        collaEntity.setLogoKey(logoKey);
        collaEntity.setMusic(createCollaCommand.music());
        collaEntity.setEmail(createCollaCommand.email());
        collaEntity.setInstagram(createCollaCommand.instagram());
        collaEntity.setFigures(createCollaCommand.figures());

        return collaEntity;
    }

    private String generateLogoKeyName(CreateCollaCommand createCollaCommand) {
        if (createCollaCommand.logo() == null || createCollaCommand.logo().isEmpty()) return "";
        String original = createCollaCommand.logo().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String collaName = createCollaCommand.name();
        collaName = collaName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "logo_colla_" + collaName + "_" + UUID.randomUUID() + extension;
    }

    private void saveImageToServer(MultipartFile imageFile, String logoKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/colles", logoKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
