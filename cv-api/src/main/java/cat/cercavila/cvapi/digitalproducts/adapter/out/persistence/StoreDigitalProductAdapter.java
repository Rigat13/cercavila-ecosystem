package cat.cercavila.cvapi.digitalproducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalproducts.application.port.in.create.CreateDigitalProductCommand;
import cat.cercavila.cvapi.digitalproducts.application.port.out.StoreDigitalProductPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class StoreDigitalProductAdapter implements StoreDigitalProductPort {
    private final DigitalProductRepository digitalProductRepository;

    public StoreDigitalProductAdapter(DigitalProductRepository digitalProductRepository) { this.digitalProductRepository = digitalProductRepository; }

    @Override
    public void storeDigitalProduct(CreateDigitalProductCommand createDigitalProductCommand) {
        String imageKeyName = generateImageKeyName(createDigitalProductCommand);
        if (!imageKeyName.equals("")) saveImageToServer(createDigitalProductCommand.image(), imageKeyName);
        digitalProductRepository.save(createDigitalProductCommand2DigitalProductEntity(createDigitalProductCommand, imageKeyName));
    }

    private DigitalProductEntity createDigitalProductCommand2DigitalProductEntity(CreateDigitalProductCommand createDigitalProductCommand, String imageKey) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new DigitalProduct without an ID
        digitalProductEntity.setName(createDigitalProductCommand.name());
        digitalProductEntity.setDescription(createDigitalProductCommand.description());
        digitalProductEntity.setImageKey(imageKey);
        digitalProductEntity.setPrimaryColour(createDigitalProductCommand.primaryColour());
        digitalProductEntity.setSecondaryColour(createDigitalProductCommand.secondaryColour());
        digitalProductEntity.setPrice(createDigitalProductCommand.price());
        digitalProductEntity.setType(createDigitalProductCommand.type());

        return digitalProductEntity;
    }

    private String generateImageKeyName(CreateDigitalProductCommand createDigitalProductCommand) {
        if (createDigitalProductCommand.image() == null || createDigitalProductCommand.image().isEmpty()) return "";
        String original = createDigitalProductCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String digitalProductName = createDigitalProductCommand.name();
        digitalProductName = digitalProductName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "image_digitalProduct_" + digitalProductName + "_" + UUID.randomUUID() + extension;
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/digitalproducts", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
