package cat.cercavila.cvapi.figures.adapter.out.persistence;

import cat.cercavila.cvapi.figures.adapter.out.persistence.FiguraEntity;
import cat.cercavila.cvapi.figures.adapter.out.persistence.FiguraRepository;
import cat.cercavila.cvapi.figures.adapter.out.persistence.MapperFiguraFiguraEntity;
import cat.cercavila.cvapi.figures.application.port.in.delete.DeleteFiguraCommand;
import cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing;
import cat.cercavila.cvapi.figures.application.port.out.DeleteFiguraPort;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class DeleteFiguraAdapter implements DeleteFiguraPort {
    private final FiguraRepository figuraRepository;

    public DeleteFiguraAdapter(FiguraRepository figuraRepository) { this.figuraRepository = figuraRepository; }

    @Override
    public void deleteFigura(DeleteFiguraCommand deleteFiguraCommand) {
        removeCurrentImage(deleteFiguraCommand);
        figuraRepository.delete(deleteFiguraCommand2FiguraEntity(deleteFiguraCommand));
    }

    private FiguraEntity deleteFiguraCommand2FiguraEntity(DeleteFiguraCommand deleteFiguraCommand) {
        FiguraEntity figuraEntity = new FiguraEntity();
        figuraEntity.setId(deleteFiguraCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the Figura
        // The other fields are not necessary for the deletion
        return figuraEntity;
    }

    private void removeCurrentImage(DeleteFiguraCommand deleteFiguraCommand) {
        String figuraId = deleteFiguraCommand.id();

        FiguraListing currentFiguraListing;
        try { currentFiguraListing = figuraRepository.getById(figuraId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        FiguraEntity currentFigura = MapperFiguraFiguraEntity.figuraListingToFiguraEntity(currentFiguraListing);

        String currentImageKey = currentFigura.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path logoPath = Paths.get("/srv/cv-api/images/figures", currentImageKey);
                Files.deleteIfExists(logoPath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }
}
