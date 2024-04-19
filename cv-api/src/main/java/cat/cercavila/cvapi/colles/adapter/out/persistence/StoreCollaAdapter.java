package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.StoreCollaPort;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class StoreCollaAdapter implements StoreCollaPort {
    private final CollaRepository collaRepository;

    public StoreCollaAdapter(CollaRepository collaRepository) { this.collaRepository = collaRepository; }

    @Override
    public void storeColla(CreateCollaCommand createCollaCommand) {
        collaRepository.save(createCollaCommand2CollaEntity(createCollaCommand));
    }

    private CollaEntity createCollaCommand2CollaEntity(CreateCollaCommand createCollaCommand) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new Colla without an ID
        collaEntity.setName(createCollaCommand.name());
        collaEntity.setEntity(createCollaCommand.entity());
        collaEntity.setFoundationYear(createCollaCommand.foundationYear());
        collaEntity.setDescription(createCollaCommand.description());
        collaEntity.setType(createCollaCommand.type());
        collaEntity.setNeighbourhood(createCollaCommand.neighbourhood());
        collaEntity.setPrimaryColour(createCollaCommand.primaryColour());
        collaEntity.setSecondaryColour(createCollaCommand.secondaryColour());

        return collaEntity;
    }
}
