package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
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
        CollaEntity collaEntity = createCollaCommand2CollaEntity(createCollaCommand);

        // Save image to server and update collaEntity with image key
        if (createCollaCommand.logo() != null && !createCollaCommand.logo().isEmpty()) {
            MultipartFile imageFile = createCollaCommand.logo();
            String imageKey = saveImageToServer(imageFile);
            collaEntity.setLogoKey(imageKey);
        }

        collaRepository.save(createCollaCommand2CollaEntity(createCollaCommand));
    }

    private String saveImageToServer(MultipartFile imageFile) {
        try {
            String filename = String.valueOf(UUID.randomUUID()); // Generate unique filename or UUID
            Path filePath = Paths.get("/srv/cv-api/images", filename);
            Files.copy(imageFile.getInputStream(), filePath);
            return filename;
        } catch (Exception e) {
            // Handle exception
            return null;
        }
    }

    private CollaEntity createCollaCommand2CollaEntity(CreateCollaCommand createCollaCommand) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new Colla without an ID
        collaEntity.setName(createCollaCommand.name());
        collaEntity.setEntity(createCollaCommand.entity());
        collaEntity.setFoundationYear(createCollaCommand.foundationYear());
        collaEntity.setDescription(createCollaCommand.description());
        collaEntity.setType(createCollaCommand.type());
        collaEntity.setNeighbourhood(createCollaCommand.neighbourhood());

        return collaEntity;
    }
}
