package cat.cercavila.cvapi.figures.adapter.out.persistence;

import cat.cercavila.cvapi.figures.adapter.out.persistence.FiguraEntity;
import cat.cercavila.cvapi.figures.adapter.out.persistence.FiguraRepository;
import cat.cercavila.cvapi.figures.application.port.in.create.CreateFiguraCommand;
import cat.cercavila.cvapi.figures.application.port.out.StoreFiguraPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class StoreFiguraAdapter implements StoreFiguraPort {
    private final cat.cercavila.cvapi.figures.adapter.out.persistence.FiguraRepository figuraRepository;

    public StoreFiguraAdapter(FiguraRepository figuraRepository) { this.figuraRepository = figuraRepository; }

    @Override
    public void storeFigura(CreateFiguraCommand createFiguraCommand) {
        String imageKeyName = generateImageKeyName(createFiguraCommand);
        if (!imageKeyName.equals("")) saveImageToServer(createFiguraCommand.image(), imageKeyName);
        figuraRepository.save(createFiguraCommand2FiguraEntity(createFiguraCommand, imageKeyName));
    }

    private FiguraEntity createFiguraCommand2FiguraEntity(CreateFiguraCommand createFiguraCommand, String imageKey) {
        FiguraEntity figuraEntity = new FiguraEntity();
        figuraEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new Figura without an ID
        figuraEntity.setName(createFiguraCommand.name());
        figuraEntity.setYear(createFiguraCommand.year());
        figuraEntity.setType(createFiguraCommand.type());
        figuraEntity.setImageKey(imageKey);
        figuraEntity.setWebUrl(createFiguraCommand.webUrl());

        return figuraEntity;
    }

    private String generateImageKeyName(CreateFiguraCommand createFiguraCommand) {
        if (createFiguraCommand.image() == null || createFiguraCommand.image().isEmpty()) return "";
        String original = createFiguraCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String figuraName = createFiguraCommand.name();
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
