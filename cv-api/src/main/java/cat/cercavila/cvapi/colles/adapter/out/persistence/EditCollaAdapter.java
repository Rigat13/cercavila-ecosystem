package cat.cercavila.cvapi.colles.adapter.out.persistence;


import cat.cercavila.cvapi.colles.application.port.in.edit.EditCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.EditCollaPort;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class EditCollaAdapter implements EditCollaPort {
    private final CollaRepository collaRepository;

    public EditCollaAdapter(CollaRepository collaRepository) { this.collaRepository = collaRepository; }

    @Override
    public void editColla(EditCollaCommand editCollaCommand) {
        collaRepository.save(editCollaCommand2CollaEntity(editCollaCommand)); // NOTE: save does not mean "create"; if it exists, it will update
    }

    private CollaEntity editCollaCommand2CollaEntity(EditCollaCommand editCollaCommand) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(editCollaCommand.id()); // IMPORTANT: Here, an existing ID is used to update the Colla
        collaEntity.setName(editCollaCommand.name());
        collaEntity.setEntity(editCollaCommand.entity());
        collaEntity.setFoundationYear(editCollaCommand.foundationYear());

        return collaEntity;
    }
}
