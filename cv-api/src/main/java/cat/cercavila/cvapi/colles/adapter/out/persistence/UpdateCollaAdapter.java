package cat.cercavila.cvapi.colles.adapter.out.persistence;


import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.UpdateCollaPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class UpdateCollaAdapter implements UpdateCollaPort {
    private final CollaRepository collaRepository;

    public UpdateCollaAdapter(CollaRepository collaRepository) { this.collaRepository = collaRepository; }

    @Override
    public void updateColla(UpdateCollaCommand updateCollaCommand) {
        String logoKeyName = generateLogoKeyName(updateCollaCommand);
        if (!logoKeyName.equals("")) {
            removeCurrentLogo(updateCollaCommand);
            saveImageToServer(updateCollaCommand.logo(), logoKeyName);
        }
        collaRepository.save(updateCollaCommand2CollaEntity(updateCollaCommand, logoKeyName)); // NOTE: save does not mean "create"; if it exists, it will update
    }

    private CollaEntity updateCollaCommand2CollaEntity(UpdateCollaCommand updateCollaCommand, String logoKey) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(updateCollaCommand.id());
        collaEntity.setName(updateCollaCommand.name());
        collaEntity.setEntity(updateCollaCommand.entity());
        collaEntity.setFoundationYear(updateCollaCommand.foundationYear());
        collaEntity.setDescription(updateCollaCommand.description());
        collaEntity.setType(updateCollaCommand.type());
        collaEntity.setNeighbourhood(updateCollaCommand.neighbourhood());
        collaEntity.setPrimaryColour(updateCollaCommand.primaryColour());
        collaEntity.setSecondaryColour(updateCollaCommand.secondaryColour());
        collaEntity.setLogoKey(logoKey);
        collaEntity.setMusic(updateCollaCommand.music());
        collaEntity.setEmail(updateCollaCommand.email());
        collaEntity.setInstagram(updateCollaCommand.instagram());
        collaEntity.setFigures(updateCollaCommand.figures());

        return collaEntity;
    }

    private String generateLogoKeyName(UpdateCollaCommand updateCollaCommand) {
        if (updateCollaCommand.logo() == null || updateCollaCommand.logo().isEmpty()) return "";
        String original = updateCollaCommand.logo().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String collaName = updateCollaCommand.name();
        collaName = collaName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "logo_colla_" + collaName + "_" + UUID.randomUUID() + extension;
    }

    private void removeCurrentLogo(UpdateCollaCommand updateCollaCommand) {
        String collaId = updateCollaCommand.id();

        CollaListing currentCollaListing;
        try { currentCollaListing = collaRepository.getById(collaId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        CollaEntity currentColla = MapperCollaCollaEntity.collaListingToCollaEntity(currentCollaListing);

        String currentLogoKey = currentColla.getLogoKey();
        if (currentLogoKey != null && !currentLogoKey.isEmpty()) {
            try {
                Path logoPath = Paths.get("/srv/cv-api/images", currentLogoKey);
                Files.deleteIfExists(logoPath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }

    private void saveImageToServer(MultipartFile imageFile, String logoKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images", logoKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
