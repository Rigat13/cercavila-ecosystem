package cat.cercavila.cvapi.colles.adapter.out.persistence;


import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.UpdateCollaPort;
import org.springframework.stereotype.Component;

@Component
public class UpdateCollaAdapter implements UpdateCollaPort {
    private final CollaRepository collaRepository;

    public UpdateCollaAdapter(CollaRepository collaRepository) { this.collaRepository = collaRepository; }

    @Override
    public void updateColla(UpdateCollaCommand updateCollaCommand) {
        collaRepository.save(updateCollaCommand2CollaEntity(updateCollaCommand)); // NOTE: save does not mean "create"; if it exists, it will update
    }

    private CollaEntity updateCollaCommand2CollaEntity(UpdateCollaCommand updateCollaCommand) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(updateCollaCommand.id()); // IMPORTANT: Here, an existing ID is used to update the Colla
        collaEntity.setName(updateCollaCommand.name());
        collaEntity.setEntity(updateCollaCommand.entity());
        collaEntity.setFoundationYear(updateCollaCommand.foundationYear());

        return collaEntity;
    }
}
