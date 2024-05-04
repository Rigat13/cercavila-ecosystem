package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.out.StoreDigitalProductPort;
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
        digitalProductRepository.save(createFiguraCommand2FiguraEntity(createDigitalProductCommand, imageKeyName));
    }

    private DigitalProductEntity createFiguraCommand2FiguraEntity(CreateDigitalProductCommand createDigitalProductCommand, String imageKey) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new DigitalProduct without an ID
        digitalProductEntity.setName(createDigitalProductCommand.name());
        digitalProductEntity.setYear(createDigitalProductCommand.year());
        digitalProductEntity.setType(createDigitalProductCommand.type());
        digitalProductEntity.setImageKey(imageKey);
        digitalProductEntity.setWebUrl(createDigitalProductCommand.webUrl());

        return digitalProductEntity;
    }

    private String generateImageKeyName(CreateDigitalProductCommand createDigitalProductCommand) {
        if (createDigitalProductCommand.image() == null || createDigitalProductCommand.image().isEmpty()) return "";
        String original = createDigitalProductCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String figuraName = createDigitalProductCommand.name();
        figuraName = figuraName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "image_figura_" + figuraName + "_" + UUID.randomUUID() + extension;
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/figures", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
