package cat.cercavila.cvapi.colles.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateColla;
import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreCollaController {
    private CreateColla createColla;

    public StoreCollaController(CreateColla createColla) { this.createColla = createColla; }

    @PostMapping("/api/colles")
    public void storeColla(@RequestBody CreateCollaCommand createCollaCommand) {
        createColla.createColla(createCollaCommand);
    }
}
