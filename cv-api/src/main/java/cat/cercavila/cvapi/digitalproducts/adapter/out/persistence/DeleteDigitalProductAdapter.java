package cat.cercavila.cvapi.digitalproducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalproducts.application.port.in.delete.DeleteDigitalProductCommand;
import cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalproducts.application.port.out.DeleteDigitalProductPort;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class DeleteDigitalProductAdapter implements DeleteDigitalProductPort {
    private final DigitalProductRepository digitalProductRepository;

    public DeleteDigitalProductAdapter(DigitalProductRepository digitalProductRepository) { this.digitalProductRepository = digitalProductRepository; }

    @Override
    public void deleteDigitalProduct(DeleteDigitalProductCommand deleteDigitalProductCommand) {
        removeCurrentImage(deleteDigitalProductCommand);
        digitalProductRepository.delete(deleteDigitalProductCommand2DigitalProductEntity(deleteDigitalProductCommand));
    }

    private DigitalProductEntity deleteDigitalProductCommand2DigitalProductEntity(DeleteDigitalProductCommand deleteDigitalProductCommand) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(deleteDigitalProductCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the DigitalProduct
        // The other fields are not necessary for the deletion
        return digitalProductEntity;
    }

    private void removeCurrentImage(DeleteDigitalProductCommand deleteDigitalProductCommand) {
        String digitalProductId = deleteDigitalProductCommand.id();

        DigitalProductListing currentDigitalProductListing;
        try { currentDigitalProductListing = digitalProductRepository.getById(digitalProductId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        DigitalProductEntity currentDigitalProduct = MapperDigitalProductDigitalProductEntity.digitalProductListingToDigitalProductEntity(currentDigitalProductListing);

        String currentImageKey = currentDigitalProduct.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path logoPath = Paths.get("/srv/cv-api/images/digitalProducts", currentImageKey);
                Files.deleteIfExists(logoPath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }
}
