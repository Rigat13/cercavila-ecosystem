package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.FiguraListing;
import cat.cercavila.cvapi.digitalProducts.application.port.in.update.UpdateFiguraCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.out.UpdateFiguraPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class UpdateFiguraAdapter implements UpdateFiguraPort {
    private final FiguraRepository figuraRepository;

    public UpdateFiguraAdapter(FiguraRepository figuraRepository) { this.figuraRepository = figuraRepository; }

    @Override
    public void updateFigura(UpdateFiguraCommand updateFiguraCommand) {
        String imageKeyName = generateImageKeyName(updateFiguraCommand);
        if (!imageKeyName.equals("")) {
            removeCurrentImage(updateFiguraCommand);
            saveImageToServer(updateFiguraCommand.image(), imageKeyName);
        }
        figuraRepository.save(updateFiguraCommand2FiguraEntity(updateFiguraCommand, imageKeyName)); // NOTE: save does not mean "create"; if it exists, it will update
    }

    private FiguraEntity updateFiguraCommand2FiguraEntity(UpdateFiguraCommand updateFiguraCommand, String imageKey) {
        FiguraEntity figuraEntity = new FiguraEntity();
        figuraEntity.setId(updateFiguraCommand.id());
        figuraEntity.setName(updateFiguraCommand.name());
        figuraEntity.setYear(updateFiguraCommand.year());
        figuraEntity.setType(updateFiguraCommand.type());
        figuraEntity.setImageKey(imageKey);
        figuraEntity.setWebUrl(updateFiguraCommand.webUrl());

        return figuraEntity;
    }

    private String generateImageKeyName(UpdateFiguraCommand updateFiguraCommand) {
        if (updateFiguraCommand.image() == null || updateFiguraCommand.image().isEmpty()) return "";
        String original = updateFiguraCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String figuraName = updateFiguraCommand.name();
        figuraName = figuraName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "image_figura_" + figuraName + "_" + UUID.randomUUID() + extension;
    }

    private void removeCurrentImage(UpdateFiguraCommand updateFiguraCommand) {
        String figuraId = updateFiguraCommand.id();

        FiguraListing currentFiguraListing;
        try { currentFiguraListing = figuraRepository.getById(figuraId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        FiguraEntity currentFigura = MapperFiguraFiguraEntity.figuraListingToFiguraEntity(currentFiguraListing);

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
