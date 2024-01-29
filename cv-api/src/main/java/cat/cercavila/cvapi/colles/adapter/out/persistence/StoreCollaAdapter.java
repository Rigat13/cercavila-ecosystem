package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.StoreCollaPort;
import org.springframework.stereotype.Component;

@Component
public class StoreCollaAdapter implements StoreCollaPort {
    private final CollaRepository collaRepository;

    public StoreCollaAdapter(CollaRepository collaRepository) { this.collaRepository = collaRepository; }

    @Override
    public void storeColla(CreateCollaCommand createCollaCommand) {
        collaRepository.save(collaCommand2CollaEntity(createCollaCommand));
    }

    private CollaEntity collaCommand2CollaEntity(CreateCollaCommand createCollaCommand) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(createCollaCommand.id());
        collaEntity.setName(createCollaCommand.name());
        collaEntity.setEntity(createCollaCommand.entity());
        collaEntity.setFoundationYear(createCollaCommand.foundationYear());

        return collaEntity;
    }
}
