package cat.cercavila.cvapi.colles.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaUseCase;
import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class StoreCollaController {
    private CreateCollaUseCase createCollaUseCase;

    public StoreCollaController(CreateCollaUseCase createCollaUseCase) {
        this.createCollaUseCase = createCollaUseCase;
    }

    @PostMapping("/api/colles")
    public void storeColla(@ModelAttribute CreateCollaCommand createCollaCommand) {
        System.out.println("AARRIBA A STORE COLLA");
        System.out.println("Nom: " + createCollaCommand.name());
        System.out.println("Arxiu: " + createCollaCommand.logo().getName());
        createCollaUseCase.createColla(createCollaCommand);
    }
}
