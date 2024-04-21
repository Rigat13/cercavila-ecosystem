package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.DeleteCollaPort;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class DeleteCollaAdapter implements DeleteCollaPort {
    private final CollaRepository collaRepository;

    public DeleteCollaAdapter(CollaRepository collaRepository) { this.collaRepository = collaRepository; }

    @Override
    public void deleteColla(DeleteCollaCommand deleteCollaCommand) {
        removeCurrentLogo(deleteCollaCommand);
        collaRepository.delete(deleteCollaCommand2CollaEntity(deleteCollaCommand));
    }

    private CollaEntity deleteCollaCommand2CollaEntity(DeleteCollaCommand deleteCollaCommand) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(deleteCollaCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the Colla
        // The other fields are not necessary for the deletion
        return collaEntity;
    }

    private void removeCurrentLogo(DeleteCollaCommand deleteCollaCommand) {
        String collaId = deleteCollaCommand.id();

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
}
