package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalProducts.application.port.out.DeleteDigitalProductPort;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class DeleteDigitalProductAdapter implements DeleteDigitalProductPort {
    private final DigitalProductRepository digitalProductRepository;

    public DeleteDigitalProductAdapter(DigitalProductRepository digitalProductRepository) { this.digitalProductRepository = digitalProductRepository; }

    @Override
    public void deleteFigura(DeleteDigitalProductCommand deleteDigitalProductCommand) {
        removeCurrentImage(deleteDigitalProductCommand);
        digitalProductRepository.delete(deleteFiguraCommand2FiguraEntity(deleteDigitalProductCommand));
    }

    private DigitalProductEntity deleteFiguraCommand2FiguraEntity(DeleteDigitalProductCommand deleteDigitalProductCommand) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(deleteDigitalProductCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the DigitalProducts
        // The other fields are not necessary for the deletion
        return digitalProductEntity;
    }

    private void removeCurrentImage(DeleteDigitalProductCommand deleteDigitalProductCommand) {
        String figuraId = deleteDigitalProductCommand.id();

        DigitalProductListing currentDigitalProductListing;
        try { currentDigitalProductListing = digitalProductRepository.getById(figuraId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        DigitalProductEntity currentFigura = MapperDigitalProductDigitalProductEntity.figuraListingToFiguraEntity(currentDigitalProductListing);

        String currentImageKey = currentFigura.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path logoPath = Paths.get("/srv/cv-api/images/figures", currentImageKey);
                Files.deleteIfExists(logoPath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }
}
