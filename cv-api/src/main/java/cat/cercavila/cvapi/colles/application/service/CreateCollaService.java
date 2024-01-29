package cat.cercavila.cvapi.colles.application.service;

import cat.cercavila.cvapi.colles.application.port.in.CreateColla;
import cat.cercavila.cvapi.colles.application.port.in.CreateCollaCommand;
import org.springframework.stereotype.Service;

@Service
public class CreateCollaService implements CreateColla {

    @Override
    public void createColla(CreateCollaCommand createCollaCommand) {

    }

}
