package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalProducts.application.port.in.update.UpdateDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.out.UpdateDigitalProductPort;
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
    public void updateDigitalProduct(UpdateDigitalProductCommand updateFiguraCommand) {
        String imageKeyName = generateImageKeyName(updateFiguraCommand);
        if (!imageKeyName.equals("")) {
            removeCurrentImage(updateFiguraCommand);
            saveImageToServer(updateFiguraCommand.image(), imageKeyName);
        }
        digitalProductRepository.save(updateFiguraCommand2FiguraEntity(updateFiguraCommand, imageKeyName)); // NOTE: save does not mean "create"; if it exists, it will update
    }

    private DigitalProductEntity updateFiguraCommand2FiguraEntity(UpdateDigitalProductCommand updateFiguraCommand, String imageKey) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(updateFiguraCommand.id());
        digitalProductEntity.setName(updateFiguraCommand.name());
        digitalProductEntity.setYear(updateFiguraCommand.year());
        digitalProductEntity.setType(updateFiguraCommand.type());
        digitalProductEntity.setImageKey(imageKey);
        digitalProductEntity.setWebUrl(updateFiguraCommand.webUrl());

        return digitalProductEntity;
    }

    private String generateImageKeyName(UpdateDigitalProductCommand updateFiguraCommand) {
        if (updateFiguraCommand.image() == null || updateFiguraCommand.image().isEmpty()) return "";
        String original = updateFiguraCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String figuraName = updateFiguraCommand.name();
        figuraName = figuraName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "image_figura_" + figuraName + "_" + UUID.randomUUID() + extension;
    }

    private void removeCurrentImage(UpdateDigitalProductCommand updateFiguraCommand) {
        String figuraId = updateFiguraCommand.id();

        DigitalProductListing currentDigitalProductListing;
        try { currentDigitalProductListing = digitalProductRepository.getById(figuraId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        DigitalProductEntity currentFigura = MapperDigitalProductDigitalProductEntity.figuraListingToFiguraEntity(currentDigitalProductListing);

        String currentImageKey = currentFigura.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path imagePath = Paths.get("/srv/cv-api/images/figures", currentImageKey);
                Files.deleteIfExists(imagePath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/figures", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
