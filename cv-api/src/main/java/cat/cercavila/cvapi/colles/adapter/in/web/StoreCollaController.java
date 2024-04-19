package cat.cercavila.cvapi.colles.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaUseCase;
import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class StoreCollaController {
    private CreateCollaUseCase createCollaUseCase;

    public StoreCollaController(CreateCollaUseCase createCollaUseCase) {
        this.createCollaUseCase = createCollaUseCase;
    }

    @PostMapping("/api/colles")
    public void storeColla(
            @RequestBody CreateCollaCommand createCollaCommand,
            @RequestPart(value = "logo", required = false) MultipartFile logo) {
        System.out.println("AARRIBA A STORE COLLA");
        System.out.println("Nom: " + logo.getName());
        createCollaUseCase.createColla(createCollaCommand);
    }
}
