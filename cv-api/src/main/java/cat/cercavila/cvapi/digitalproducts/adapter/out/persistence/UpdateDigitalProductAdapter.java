package cat.cercavila.cvapi.digitalproducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalproducts.application.port.in.update.UpdateDigitalProductCommand;
import cat.cercavila.cvapi.digitalproducts.application.port.out.UpdateDigitalProductPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class UpdateDigitalProductAdapter implements UpdateDigitalProductPort {
    private final DigitalProductRepository digitalProductRepository;

    public UpdateDigitalProductAdapter(DigitalProductRepository digitalProductRepository) { this.digitalProductRepository = digitalProductRepository; }

    @Override
    public void updateDigitalProduct(UpdateDigitalProductCommand updateDigitalProductCommand) {
        String imageKeyName = generateImageKeyName(updateDigitalProductCommand);
        if (!imageKeyName.equals("")) {
            removeCurrentImage(updateDigitalProductCommand);
            saveImageToServer(updateDigitalProductCommand.image(), imageKeyName);
        }

        digitalProductRepository.save(updateDigitalProductCommand2DigitalProductEntity(updateDigitalProductCommand, imageKeyName)); // NOTE: save does not mean "create"; if it exists, it will update

    }

    private DigitalProductEntity updateDigitalProductCommand2DigitalProductEntity(UpdateDigitalProductCommand updateDigitalProductCommand, String imageKey) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(updateDigitalProductCommand.id());
        digitalProductEntity.setName(updateDigitalProductCommand.name());
        digitalProductEntity.setDescription(updateDigitalProductCommand.description());
        digitalProductEntity.setImageKey(imageKey);
        digitalProductEntity.setPrimaryColour(updateDigitalProductCommand.primaryColour());
        digitalProductEntity.setSecondaryColour(updateDigitalProductCommand.secondaryColour());
        digitalProductEntity.setPrice(updateDigitalProductCommand.price());
        digitalProductEntity.setType(updateDigitalProductCommand.type());

        return digitalProductEntity;
    }

    private String generateImageKeyName(UpdateDigitalProductCommand updateDigitalProductCommand) {
        if (updateDigitalProductCommand.image() == null || updateDigitalProductCommand.image().isEmpty()) return "";

        String original = updateDigitalProductCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String digitalProductName = updateDigitalProductCommand.name();
        digitalProductName = digitalProductName.replaceAll("[^a-zA-Z0-9.-]", "_");

        return "image_digitalProduct_" + digitalProductName + "_" + UUID.randomUUID() + extension;
    }

    private void removeCurrentImage(UpdateDigitalProductCommand updateDigitalProductCommand) {
        String digitalProductId = updateDigitalProductCommand.id();

        DigitalProductListing currentDigitalProductListing;
        try { currentDigitalProductListing = digitalProductRepository.getById(digitalProductId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        DigitalProductEntity currentDigitalProduct = MapperDigitalProductDigitalProductEntity.digitalProductListingToDigitalProductEntity(currentDigitalProductListing);

        String currentImageKey = currentDigitalProduct.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path imagePath = Paths.get("/srv/cv-api/images/digitalproducts", currentImageKey);
                Files.deleteIfExists(imagePath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/digitalproducts", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
